import { Command, Option, runExit } from "clipanion";

import { AwacyGame } from "./interfaces/awacy-game";
import { EpicDataOffer, EpicDataOfferList } from "./interfaces/epic-data-offer";

import * as fs from "fs";

import Fuse from "fuse.js";
import { Prompt } from "enquirer";

runExit(
  class FillEpicStoreIds extends Command {
    // Positional option
    awacy_games_json = Option.String();
    epicdata_offers_lists_json = Option.String();

    async execute() {
      const awacy_games: AwacyGame[] = JSON.parse(
        fs.readFileSync(this.awacy_games_json, "utf8")
      );
      const epicOffers: EpicDataOffer[] = JSON.parse(
        fs.readFileSync(this.epicdata_offers_lists_json, "utf8")
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
            slug: offer[8],
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
      });

      for (const game of awacy_games) {
        const result = fuse.search(game.name);
        if (result.length > 0) {
          // If perfect match, use that
          if (result[0].score === 1) {
            console.log(`${game.name} -> ${result[0].item.name}`);

            game.storeIds.epic.namespace = result[0].item.namespace;
            game.storeIds.epic.slug = result[0].item.slug;
          }
          // If no perfect match, wait for confirmation
          else {
            console.log(
              `${game.name} has multiple matches: ${result
                .map((r) => `${r.item.name} (${r.score})`)
                .join(", ")}`
            );
            // Use enquirer to select answer
            const answer = await new Prompt({
              type: "select",
              name: "answer",
              message: `Select the correct match for ${game.name}`,
              choices: result
                .map((r, index) => {
                  return {
                    name: `${r.item.name}`,
                    message: `${r.item.name} (${r.score})`,
                    hint: `https://www.epicgames.com/store/product/${r.item.slug}`,
                    value: `${index}`,
                  };
                })
                // Add option "None" to the list
                .concat([
                  {
                    name: "None",
                    message: "None",
                    hint: "None of the above",
                    value: "None",
                  },
                ]),
            }).run();

            if (answer === "None") {
              continue;
            } else {
              console.log(`${game.name} -> ${result[0].item.name}`);

              game.storeIds.epic.namespace = result[answer].item.namespace;
              game.storeIds.epic.slug = result[answer].item.slug;
            }
          }
        }
      }
    }
  }
);
