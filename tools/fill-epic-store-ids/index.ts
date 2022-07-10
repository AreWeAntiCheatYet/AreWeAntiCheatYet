import { Command, Option, runExit } from "clipanion";

import { AwacyGame, AwacyGameInternal } from "./interfaces/awacy-game";
import { EpicDataOfferList, EpicGame } from "./interfaces/epic-data-offer";

import * as fs from "fs";

import Chalk from "chalk";

import Fuse from "fuse.js";
import inquirer from "inquirer";

function simplifyGameName(name: string): string {
  return (
    name
      .replaceAll(/[:™®,]/g, "")
      .replaceAll(/-/g, " ")
      // Remove years like (2018)
      .replaceAll(/\(\d{4}\)/g, "")
      .trim()
      .toLowerCase()
  );
}

runExit(
  class FillEpicStoreIds extends Command {
    // Positional option
    awacyGamesJson = Option.String();
    epicDataOffersListsJson = Option.String();

    async execute() {
      const awacyGames: AwacyGameInternal[] = JSON.parse(
        fs.readFileSync(this.awacyGamesJson, "utf8")
      ).map((game: AwacyGame): AwacyGameInternal => {
        return {
          ...game,
          simplifiedName: simplifyGameName(game.name),
        };
      });

      const epicGames: EpicGame[] = JSON.parse(
        fs.readFileSync(this.epicDataOffersListsJson, "utf8")
      )
        .map((offer: EpicDataOfferList) => {
          const name = offer[2];
          return {
            namespace: offer[1],
            name,
            offerTypes: offer[3],
            slug: offer[8].replaceAll(/\/home$/g, ""),
            simplifiedName: name && simplifyGameName(name),
          };
        })
        .filter((game: EpicGame) => {
          return (
            // Filter out offers that are not games
            game.offerTypes.includes("games") &&
            // Filter out bundles
            !game.offerTypes.includes("bundle") &&
            // Either include "games/edition/base" or does not include "games/edition"
            (game.offerTypes.includes("games/edition/base") ||
              !game.offerTypes.includes("games/edition")) &&
            // Filter out empty slugs
            game.slug !== "" &&
            // Either slug ends with /home or does not container any /
            (game.slug.endsWith("/home") || !game.slug.includes("/")) &&
            // namespace isn't epic
            game.namespace !== "epic"
          );
        });

      // fuse.js is used to find the best match for each game name
      const fuse = new Fuse(epicGames, {
        includeScore: true,
        keys: ["simplifiedName"],
        shouldSort: true,
        threshold: 0.15,
      });

      for (const awacyGame of awacyGames) {
        function useMatch(match: EpicGame) {
          console.log(Chalk.green(`${awacyGame.name} -> ${match.name}`));

          awacyGame.storeIds.epic = {
            namespace: match.namespace,
            slug: match.slug,
          };
        }

        function rejectMatches() {
          console.log(Chalk.red(awacyGame.name));
        }

        const matches = fuse
          .search(awacyGame.simplifiedName)
          // Remove results with same namespace and slug
          .filter(
            (result: any, index: number, self: any) =>
              index ===
              self.findIndex(
                (t: any) =>
                  t.item.namespace === result.item.namespace &&
                  t.item.slug === result.item.slug
              )
          );

        if (matches.length > 0) {
          // If perfect match, use that
          if (matches[0].score <= 0.0001) {
            useMatch(matches[0].item);
          }
          // If no perfect match, wait for confirmation
          else {
            console.log(Chalk.blue(awacyGame.name));

            const selection: "None" | number = (
              await inquirer.prompt({
                type: "list",
                name: "selection",
                message: `Select the correct match for ${awacyGame.name}`,
                choices: [
                  {
                    name: "None",
                    short: "None of the below",
                    value: "None",
                  },
                  ...matches.map((r, index) => {
                    return {
                      name: `${r.item.name} (https://epicgames.com/p/${r.item.slug})`,
                      value: index,
                      short: r.item.name,
                    };
                  }),
                ],
              })
            ).selection;

            if (selection === "None") {
              rejectMatches();
              continue;
            } else {
              useMatch(matches[selection].item);
            }
          }
        } else {
          rejectMatches();
        }
      }

      // Write back to AWACY's games.json
      fs.writeFileSync(
        this.awacyGamesJson,
        JSON.stringify(
          // Remove simplifiedName from the output
          awacyGames.map((game: AwacyGameInternal): AwacyGame => {
            delete game.simplifiedName;
            return game;
          }),
          null,
          4
        ),
        "utf8"
      );
    }
  }
);
