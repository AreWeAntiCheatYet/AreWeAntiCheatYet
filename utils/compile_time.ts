/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
import fs, { promises as fsPromise } from 'fs';
import gm from 'gm';
import createMetascraper from 'metascraper';
import metascraperDescription from 'metascraper-description';
import metascraperTitle from 'metascraper-title';
import fetch from 'node-fetch';
import ogs from 'open-graph-scraper';
import Game, { GameStatus } from '../types/game';
import Overview from '../types/overview';

export async function downloadImagesAndSetLogo(games: Game[]) {
  if (process.env.NODE_ENV === 'development') {
    //? Dont fetch images on dev builds because they would be newly downloaded each time.
    console.log('Skipping cover image download');
    return games;
  }

  console.log('Downloading cover images...');
  const gamesWithIcons = [...games];

  if (fs.existsSync('./temp-icons')) {
    await fsPromise.rm('./temp-icons', { recursive: true });
  }
  await fsPromise.mkdir('./temp-icons');

  const gamesWithNoIcons = games.filter((game) => !game.logo);
  const icons = await Promise.all(
    gamesWithNoIcons.map((game) =>
      fetch(`https://www.igdb.com/search_autocomplete_all?q=${game.name}`)
    )
  );

  for (const [index, icon] of icons.entries()) {
    const suggestions: any = await icon.json();

    const name: string = suggestions.game_suggest[0].cloudinary;

    if (name) {
      const png = `https://images.igdb.com/igdb/image/upload/t_cover_big/${name}.png`;

      const blob = await fetch(png);
      fs.writeFileSync(`temp-icons/${name}.png`, Buffer.from(await blob.arrayBuffer()));

      gm(`temp-icons/${name}.png`).write(`./public/logos/${name}.webp`, (err) => {
        if (err) {
          console.error(err);
        }
      });

      gamesWithIcons.find(
        (game) => game.name === gamesWithNoIcons[index].name
      )!.logo = `logos/${name}.webp`;
    }

    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  await fsPromise.rm('./temp-icons', { recursive: true });
  console.log('Download & Conversion finished!');
  return gamesWithIcons;
}

export async function fetchReferenceTitles(games: Game[]) {
  if (process.env.NODE_ENV === 'development') {
    //? Dont fetch references on dev builds.
    console.log('Skipping reference resolve');
    return games;
  }

  const gamesWithReferenceTitles = [...games];
  const metascraper = createMetascraper([metascraperDescription(), metascraperTitle()]);

  const updates = games
    .filter((game) => game.updates.length > 0)
    .flatMap((game) => game.updates)
    .filter((game) => game.reference);

  const metadatas = await Promise.allSettled(
    updates.map(async (update) =>
      ogs({
        url: update.reference,
        followRedirect: true,
      })
    )
  );

  for (const [index, promise] of metadatas.entries()) {
    const update = updates[index];

    const gameUpdate = gamesWithReferenceTitles
      .find((game) =>
        game.updates.find((statusUpdate) => statusUpdate.reference === update.reference)
      )!
      .updates.find((statusUpdate) => statusUpdate.reference === update.reference)!;

    if (promise.status === 'fulfilled' && !promise.value.error) {
      const metadata = promise.value;
      const title = metadata.result.ogTitle;

      if (title) {
        gameUpdate.referenceTitle = title.length > 40 ? title.substr(0, 37).concat('...') : title;
      } else if (update.reference.includes('protondb')) {
        gameUpdate.referenceTitle = 'ProtonDB';
      }

      if (metadata.result.ogDescription) {
        gameUpdate.referenceDescription = metadata.result.ogDescription;
      }
    } else {
      const { title, description } = await metascraper({
        url: update.reference,
        html: await (await fetch(update.reference)).text(),
      });

      if (title) {
        if (title === 'Access denied' && update.reference.includes('steamdb')) {
          gameUpdate.referenceTitle = 'SteamDB';
        } else {
          gameUpdate.referenceTitle = title.length > 40 ? title.substr(0, 37).concat('...') : title;
        }
      }

      if (description) {
        gameUpdate.referenceDescription = description;
      }
    }
  }

  return gamesWithReferenceTitles;
}

export function generateOverview(games: Game[]) {
  const overview: Overview = {
    total: games.length,
    broken: 0,
    denied: 0,
    planned: 0,
    running: 0,
    supported: 0,
  };

  for (const game of games) {
    switch (game.status) {
      case GameStatus.broken:
        overview.broken++;
        break;
      case GameStatus.denied:
        overview.denied++;
        break;
      case GameStatus.planned:
        overview.planned++;
        break;
      case GameStatus.running:
        overview.running++;
        break;
      case GameStatus.supported:
        overview.supported++;
        break;
    }
  }

  return overview;
}

export function generateBreakdown(games: Game[]) {
  const breakdown = new Map(
    [...new Set(games.flatMap((game) => game.anticheats))].map<[string, Overview]>((anticheat) => [
      anticheat,
      { total: 0, broken: 0, denied: 0, planned: 0, running: 0, supported: 0 },
    ])
  );

  for (const game of games) {
    for (const anticheat of game.anticheats) {
      breakdown.get(anticheat)!.total++;

      switch (game.status) {
        case GameStatus.broken:
          breakdown.get(anticheat)!.broken++;
          break;
        case GameStatus.denied:
          breakdown.get(anticheat)!.denied++;
          break;
        case GameStatus.planned:
          breakdown.get(anticheat)!.planned++;
          break;
        case GameStatus.running:
          breakdown.get(anticheat)!.running++;
          break;
        case GameStatus.supported:
          breakdown.get(anticheat)!.supported++;
          break;
      }
    }
  }

  return Array.from(breakdown);
}

export function generateAntiCheatIconLookUp(games: Game[]) {
  const logo_map = [
    ['easy anti-cheat', 'eac.webp'],
    ['battleye', 'battleye.webp'],
    ['equ8', 'equ8.webp'],
    ['vanguard', 'vanguard.webp'],
    ['fairfight', 'fairfight.webp'],
    ['punkbuster', 'punkbuster.webp'],
    ['vac', 'vac.webp'],
    ['xign', 'xigncode3.webp'],
    ['treyarch', 'treyarch.webp'],
    ['arbiter', 'arbiter.webp'],
    ['nprotect', 'nprotect.webp'],
    ['ricochet', 'ricochet.webp'],
    ['mail.ru', 'mailru.webp'],
    ['mihoyo', 'mihoyo.webp'],
    ['nexon', 'nexon.webp'],
    ['neac', 'neac.webp'],
    ['sabreclaw', 'sabreclaw.webp'],
    ['faceit', 'faceit.webp'],
  ];

  return [...new Set(games.flatMap((game) => game.anticheats))].map((anticheat) => [
    anticheat,
    logo_map.find((item) => anticheat.toLowerCase().includes(item[0]))
      ? `anticheats/${logo_map.find((item) => anticheat.toLowerCase().includes(item[0]))![1]}`
      : null,
  ]);
}
