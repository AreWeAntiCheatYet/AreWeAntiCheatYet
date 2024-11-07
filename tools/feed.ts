import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import { readFileSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { argv } from 'process';
import { Games } from '../src/static';
import { Game } from '../src/types/games';
import { getChanges } from '../src/utils/games';

interface Item {
  title: string;
  pubDate: string;
  description: string;
}

interface Channel {
  item: Item[];

  link: string;
  title: string;
  language: string;
  description: string;
}

interface RSS {
  channel: Channel;
}

interface Feed {
  rss: RSS;
}

function describe<C extends keyof Game>(game: Game, key: C) {
  switch (key) {
    case 'anticheats':
      return game.anticheats.length > 0 ? game.anticheats.join(', ') : '<i>(Nothing)</i>';
    case 'native':
      return game.native ? 'Native' : 'Not Native';
    case 'reference':
      return game.reference ? `<a href="${game.reference}" target="_blank">${game.reference}</a>` : '<i>(Nothing)</i>';
    case 'status':
      return game.status;
    case 'url':
      return game.url;
    case 'notes':
      return game.notes.length
        ? game.notes.map((note) => `<a href="${note[1]}" target="_blank">${note[0]}</a>`).join(', ')
        : '<i>(Nothing)</i>';
    case 'updates':
      return `${game.updates.length} Updates <a href="https://areweanticheatyet.com/game/${game.slug}" target="_blank">(See More)</a>`;
  }
}

(async () => {
  const currentFeed = await readFile('public/feed.rss');

  const parser = new XMLParser({
    ignoreAttributes: false,
    allowBooleanAttributes: true,
  });

  const parsedFeed = parser.parse(currentFeed) as unknown as Feed;

  const oldGames: Game[] = JSON.parse(readFileSync(argv[2]).toString());
  const changes = getChanges(Games, oldGames);

  console.info('New Games', Games.length, 'Old Games', oldGames.length);
  console.info('Detected', changes.length, 'changes!');

  const newEntries: Item[] = [];
  const today = new Date().toUTCString();

  for (const change of changes) {
    const { name, status } = change.recent;

    if (!change.old) {
      newEntries.push({
        title: name,
        pubDate: today,
        description: `${name} was newly added and is "${status}"`,
      });
      continue;
    }

    if (!change.changedProperties || !change.old) {
      continue;
    }

    const entry: Item = {
      title: name,
      pubDate: today,
      description: '',
    };

    for (const changed of change.changedProperties) {
      const partialUpper = `${changed.at(0).toUpperCase()}${changed.substring(1)}`;

      entry.description += `<b>${partialUpper}</b>: ${describe(change.old, changed)} <b>=></b> ${describe(
        change.recent,
        changed,
      )}<br/>`;
    }

    newEntries.push(entry);
  }

  parsedFeed.rss.channel.item.push(...newEntries);

  const builder = new XMLBuilder({
    format: true,
    arrayNodeName: 'item',
    ignoreAttributes: false,
    suppressBooleanAttributes: false,
  });

  await writeFile('public/feed.rss', builder.build(parsedFeed));
})().catch(console.error);
