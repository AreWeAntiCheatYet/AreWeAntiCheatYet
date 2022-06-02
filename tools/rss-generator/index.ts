/* eslint-disable no-console */
import fs from 'fs';
import { parseXml } from 'libxmljs';
import { argv } from 'process';
import { Game } from './types';
import { describeChanges, getChanges } from './utils';

console.log(`Generating RSS-Feed from ${argv[2]} and ${argv[3]}`);

const current: Game[] = JSON.parse(fs.readFileSync(argv[2]).toString());
const previous: Game[] = JSON.parse(fs.readFileSync(argv[3]).toString());

const changes = getChanges(current, previous);

let newGames = 0;
let description = '';
let changedGames = 0;

console.log('Changes', changes);

for (const change of changes) {
  const latest = change[0];
  const old = change[1];

  if (!old) {
    newGames++;
  } else {
    changedGames++;
  }

  description += describeChanges(latest, old);
}

const rss_content = fs.readFileSync(argv[4]).toString();
const doc = parseXml(rss_content);
const main_channel = doc.get('//channel')!;

if (changes.length > 0) {
  const news = main_channel.node('item');
  news.node('description').text(description);
  news.node('pubDate').text(new Date().toUTCString());
  news
    .node('title')
    .text(
      `${newGames > 0 ? `${newGames} new game(s)${changedGames > 0 ? ', ' : ''}` : ''}${
        changedGames > 0 ? `${changedGames} changed game(s)` : ''
      }`
    );
}

fs.writeFileSync(argv[4], doc.toString(true));
console.log(`Results: ${doc.toString(true)}`);
console.log(`Writing results to: ${argv[4]}`);
