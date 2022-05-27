import fs from 'fs';
import { parseXml } from 'libxmljs';
import { argv } from 'process';

console.log(`Generating RSS-Feed from ${argv[2]} and ${argv[3]}`);

const current = JSON.parse(fs.readFileSync(argv[2]).toString());
const previous = JSON.parse(fs.readFileSync(argv[3]).toString());

const changes = current
  .filter(
    (game: any) =>
      previous.find(
        (item: any) =>
          item.name === game.name && (item.status !== game.status || item.native !== game.native)
      ) || !previous.find((item: any) => item.name === game.name)
  )
  .map((game: any) => [game, previous.find((item: any) => item.name === game.name)]);

let description = '';

for (const change of changes) {
  const latest = change[0]!;
  const old = change[1];

  if (!old) {
    description += `New game added: ${latest.name} (${latest.status}${
      latest.native ? ' & Native' : ''
    })\n`;
  } else {
    description += `${latest.name}:\n`;

    if (latest.native && !old.native) {
      description += '\t- Added Native\n';
    }
    if (latest.native && !old.native) {
      description += '\t- Removed Native\n';
    }
    if (latest.status !== old.status) {
      description += `\t- ${old.status} -> ${latest.status}\n`;
    }
  }
}

const rss_content = fs.readFileSync(argv[4]).toString();
const doc = parseXml(rss_content);
const main_channel = doc.get('//channel')!;

if (changes.length > 0) {
  const news = main_channel.node('item');
  news.node('description').text(description);
  news.node('pubDate').text(new Date().toUTCString());
}

fs.writeFileSync(argv[4], doc.toString());
console.log(`Results: ${doc.toString()}`);
console.log(`Writing results to: ${argv[4]}`);
