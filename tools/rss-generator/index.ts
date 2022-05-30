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
          item.name === game.name &&
          (item.status !== game.status ||
            item.native !== game.native ||
            JSON.stringify(item.notes) !== JSON.stringify(game.notes))
      ) || !previous.find((item: any) => item.name === game.name)
  )
  .map((game: any) => [game, previous.find((item: any) => item.name === game.name)]);

let description = '';

console.log('Changes', changes);

for (const change of changes) {
  const latest = change[0]!;
  const old = change[1];

  if (!old) {
    description += `New game added: ${latest.name}<br>`;
    description += `&emsp;- ${latest.status}${latest.native ? ' & Native' : ''}<br>`;
    description += `&emsp;- ${latest.anticheats.join(', ')}<br>`;
    for (const note of latest.notes) {
      description += `&emsp;- ${note[0]}`;
      if (note[1]) {
        description += ` (${note[1]})`;
      }
      description += '<br>';
    }
  } else {
    description += `${latest.name}:<br>`;

    if (latest.native && !old.native) {
      description += '&emsp;+ Added Native<br>';
    } else if (!latest.native && old.native) {
      description += '&emsp;- Removed Native<br>';
    }

    if (JSON.stringify(latest.notes) !== JSON.stringify(old.notes)) {
      for (const note of latest.notes) {
        if (!old.notes.find((item: any) => JSON.stringify(item) === JSON.stringify(note))) {
          description += `&emsp;+ ${note[0]}`;
          if (note[1]) {
            description += ` (${note[1]})`;
          }
          description += '<br>';
        }
      }
    }

    if (latest.status !== old.status) {
      description += `&emsp;- ${old.status} -> ${latest.status}<br>`;
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
  news.node('title').text(`Changes from ${new Date().toDateString()}`);
}

fs.writeFileSync(argv[4], doc.toString(true));
console.log(`Results: ${doc.toString(true)}`);
console.log(`Writing results to: ${argv[4]}`);
