import { Command, Option, runExit } from "clipanion";

import { AwacyGame } from "./interfaces/awacy-game";
import { EpicDataOffer, EpicDataOfferList } from "./interfaces/epic-data-offer";

import * as fs from "fs";

import Chalk from "chalk";

import Fuse from "fuse.js";
// @ts-ignore
import Enquirer from "enquirer";
import chalk from "chalk";
import terminalLink from "terminal-link";

runExit(
  class FillEpicStoreIds extends Command {
    // Positional option
    awacyGamesJson = Option.String();
    epicDataOffersListsJson = Option.String();

    async execute() {
      const awacy_games: AwacyGame[] = JSON.parse(
        fs.readFileSync(this.awacyGamesJson, "utf8")
      );
      const epicOffers: EpicDataOffer[] = JSON.parse(
        fs.readFileSync(this.epicDataOffersListsJson, "utf8")
      )
        .map((offer: EpicDataOfferList) => {
          return {
            id: offer[0],
            namespace: offer[1],
            name: offer[2],
            offerTypes: offer[3],
            publisher: offer[4],
            numericalIdOne: offer[5],
            numericalIdTwo: offer[6],
            pictureUrl: offer[7],
            slug: offer[8].replaceAll(/\/home$/g, ""),
          };
        })
        .filter((offer: EpicDataOffer) => {
          return (
            // Filter out offers that are not games
            offer.offerTypes.includes("games") &&
            // Filter out bundles
            !offer.offerTypes.includes("bundle") &&
            // Either include "games/edition/base" or does not include "games/edition"
            (offer.offerTypes.includes("games/edition/base") ||
              !offer.offerTypes.includes("games/edition")) &&
            // Filter out empty slugs
            offer.slug !== "" &&
            // Either slug ends with /home or does not container any /
            (offer.slug.endsWith("/home") || !offer.slug.includes("/")) &&
            // namespace isn't epic
            offer.namespace !== "epic"
          );
        });

      // fuse.js is used to find the best match for each game name
      const fuse = new Fuse(epicOffers, {
        includeScore: true,
        keys: ["name"],
        shouldSort: true,
        threshold: 0.15,
      });

      for (const game of awacy_games) {
        // TODO: exclude year from the search like (2015)
        const sanitizedName = game.name.replaceAll(/[:,™®]/g, "");

        const nameToSearch = `^${sanitizedName.replaceAll(
          /\s/g,
          "[:™®,]? "
        )}[:™®,]?$`;

        // Search the list first with a stricter approach
        const strictResult = epicOffers
          .filter((offer: EpicDataOffer) => offer.name.match(nameToSearch)) // Filter out duplicated results
          // Filter out duplicated results
          .filter(
            (result: any, index: number, self: any) =>
              index ===
              self.findIndex(
                (t: any) =>
                  t.namespace === result.namespace && t.slug === result.slug
              )
          );

        if (strictResult.length > 0) {
          console.log(Chalk.green(`${game.name} -> ${strictResult[0].name}`));

          game.storeIds.epic = {
            namespace: strictResult[0].namespace,
            slug: strictResult[0].slug,
          };
          continue;
        }

        const result = fuse
          .search(sanitizedName)
          // Filter out duplicated results
          .filter(
            (result: any, index: number, self: any) =>
              index ===
              self.findIndex(
                (t: any) =>
                  t.namespace === result.namespace && t.slug === result.slug
              )
          );

        if (result.length > 0) {
          // If perfect match, use that
          if (result[0].score <= 0.0001) {
            console.log(Chalk.green(`${game.name} -> ${result[0].item.name}`));

            game.storeIds.epic = {
              namespace: result[0].item.namespace,
              slug: result[0].item.slug,
            };
          }
          // If no perfect match, wait for confirmation
          else {
            console.log(Chalk.blue(game.name));
            // Use enquirer to select answer
            const choices = [
              {
                name: "None",
                message: "None",
                hint: "None of the below",
              },
            ].concat(
              result.map((r, index) => {
                return {
                  // TODO: Use real name here
                  name: `${index}`,
                  message: `${r.item.name}`,
                  hint: terminalLink(
                    "Open in Epic Games Store",
                    `https://www.epicgames.com/store/product/${r.item.slug.replaceAll(
                      /\/home$/g,
                      ""
                    )}`,
                    {
                      fallback(_text, url) {
                        return url;
                      },
                    }
                  ),
                };
              })
            );

            // @ts-ignore
            const answer = await new Enquirer.Select({
              name: "gameMatch",
              message: `Select the correct match for ${game.name}`,
              choices,
            }).run();

            if (answer === "None") {
              // Skipping this game
              console.log(Chalk.red(game.name));
              continue;
            } else {
              console.log(
                Chalk.green(`${game.name} -> ${result[0].item.name}`)
              );

              game.storeIds.epic = {
                namespace: result[answer].item.namespace,
                slug: result[answer].item.slug,
              };
            }
          }
        } else {
          console.log(Chalk.red(game.name));
        }
      }

      // Write back to awacy_games.json
      fs.writeFileSync(
        this.awacyGamesJson,
        JSON.stringify(awacy_games, null, 4),
        "utf8"
      );
    }
  }
);
