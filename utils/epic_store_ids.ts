/* eslint-disable no-param-reassign */
/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable no-inner-declarations */
import Chalk from 'chalk';
import { Command, Option, runExit } from 'clipanion';
import * as fs from 'fs';
import Fuse from 'fuse.js';
import inquirer from 'inquirer';
import Game from '../types/game';

interface InternalGame extends Game {
    simplifiedName?: string;
}

type OfferType =
    | 'games'
    | 'games/edition'
    | 'games/edition/base'
    | 'addon'
    | 'bundle';

interface EpicGame {
    namespace: string;
    name: string;
    offerTypes: OfferType[];
    slug: string;
    simplifiedName: string;
}

type EpicDataOfferList = [
    id: string,
    namespace: string,
    name: string,
    offerTypes: OfferType[],
    publisher: string,
    numericalIdOne: number,
    numericalIdTwo: number,
    pictureUrl: string,
    slug: string
];

function simplifyGameName(name: string): string {
    return (
        name
            .replaceAll(/[:™®,]/g, '')
            .replaceAll(/-/g, ' ')
            // Remove years like (2018)
            .replaceAll(/\(\d{4}\)/g, '')
            .trim()
            .toLowerCase()
    );
}

runExit(
    class FillEpicStoreIds extends Command {
        // Positional option
        awacyGamesJson = Option.String();

        async execute() {
            const awacyGames: InternalGame[] = JSON.parse(
                fs.readFileSync(this.awacyGamesJson, 'utf8')
            ).map((game: Game): InternalGame => ({
                ...game,
                simplifiedName: simplifyGameName(game.name),
            }));

            const epicDataOffersListsJson = await (await fetch('https://raw.githubusercontent.com/nachoaldamav/offers-tracker/main/database/list.json')).json();

            const epicGames: EpicGame[] = epicDataOffersListsJson
                .map((offer: EpicDataOfferList) => {
                    const name = offer[2];
                    return {
                        namespace: offer[1],
                        name,
                        offerTypes: offer[3],
                        slug: offer[8].replaceAll(/\/home$/g, ''),
                        simplifiedName: name && simplifyGameName(name),
                    };
                })
                .filter((game: EpicGame) => (
                    // Filter out offers that are not games
                    game.offerTypes.includes('games') &&
                    // Filter out bundles
                    !game.offerTypes.includes('bundle') &&
                    // Either include "games/edition/base" or does not include "games/edition"
                    (game.offerTypes.includes('games/edition/base') ||
                        !game.offerTypes.includes('games/edition')) &&
                    // Filter out empty slugs
                    game.slug !== '' &&
                    // Either slug ends with /home or does not container any /
                    (game.slug.endsWith('/home') || !game.slug.includes('/')) &&
                    // namespace isn't epic
                    game.namespace !== 'epic'
                ));

            // fuse.js is used to find the best match for each game name
            const fuse = new Fuse(epicGames, {
                includeScore: true,
                keys: ['simplifiedName'],
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
                    .search(awacyGame.simplifiedName!)
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
                    const { score } = matches[0];
                    if (score && score <= 0.0001) {
                        useMatch(matches[0].item);
                    } else {
                        // If no perfect match, wait for confirmation
                        console.log(Chalk.blue(awacyGame.name));

                        const { selection } = await inquirer.prompt({
                            type: 'list',
                            name: 'selection',
                            message: `Select the correct match for ${awacyGame.name}`,
                            choices: [
                                {
                                    name: 'None',
                                    short: 'None of the below',
                                    value: 'None',
                                },
                                ...matches.map((r, index) => ({
                                    name: `${r.item.name} (https://epicgames.com/p/${r.item.slug})`,
                                    value: index,
                                    short: r.item.name,
                                })),
                            ],
                        });

                        if (selection === 'None') {
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
                    awacyGames.map((game: InternalGame): Game => {
                        delete game.simplifiedName;
                        return game;
                    }),
                    null,
                    4
                ),
                'utf8'
            );
        }
    }
);
