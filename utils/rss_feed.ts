import fs from 'fs';
import { parseXml } from 'libxmljs';
import { argv } from 'process';
import { getChanges } from './index';
import Game, { GameStatus, Update } from '../types/game';
import { downloadImagesAndSetLogo, fetchReferenceTitles, generateAntiCheatIconLookUp } from './compile_time';

function generateDescription(oldGame: Game | undefined, newGame: Game, icons: (string | null)[][]) {
    const statusColor = (status: GameStatus) => {
        switch (status) {
            case GameStatus.denied:
                return 'rgb(224, 49, 49)';
            case GameStatus.broken:
                return 'rgb(232, 89, 12)';
            case GameStatus.planned:
                return 'rgb(103, 65, 217)';
            case GameStatus.running:
                return 'rgb(12, 133, 153)';
            case GameStatus.supported:
                return 'rgb(47, 158, 68)';
        }
        return null;
    };

    const anticheatStatus = (anticheat: string) => {
        if (oldGame && !oldGame.anticheats.find(item => item === anticheat)) {
            return '(Added) ';
        }

        if (!newGame.anticheats.find(item => item === anticheat)) {
            return '(Removed) ';
        }

        return '';
    };

    const updateStatus = (update: Update) => {
        if (oldGame && !oldGame.updates.find(item => item.name === update.name && item.reference === update.reference)) {
            return '<mark>(New)</mark> ';
        }

        if (!newGame.updates.find(item => item.name === update.name && item.reference === update.reference)) {
            return '<mark>(Removed)</mark> ';
        }

        return '';
    };

    const status = (game: Game) => `<mark style="background-color: ${statusColor(game.status)};">${game.status}</mark>${game.native ? '( & Native 👑 )' : ''}`;

    return `<h2><img src="https://areweanticheatyet.com/${newGame.logo}" height="32" width="32" style="border-radius: 50%; vertical-align:middle;"/>${oldGame ? '' : '(New!) '}${newGame.name}</h2>
                
        ${(oldGame && oldGame.reference !== newGame.reference) ?
            `<b>🔗 Reference </b>
            <ul>
                ${(oldGame && oldGame.reference) ? `<li> Old: ${oldGame.reference} </li>` : ''}
                <li><a href="${newGame.reference}" target="_blank">${(oldGame && oldGame.reference) ? 'New: ' : ''}${newGame.reference}</a></li>
            </ul>`
            :
            ''
        }

            <b>🤔 Status</b> 
            <ul>
                <li>${(oldGame && oldGame.status !== newGame.status) ? `${status(oldGame)} => ${status(newGame)}` : status(newGame)}</li>
            </ul>
                
        ${(!oldGame || JSON.stringify(oldGame.anticheats) !== JSON.stringify(newGame.anticheats)) ?
            `<b>🔒 Anti-Cheats</b>
            <ul>
                ${newGame.anticheats.map(anticheat => `<li> <img src="https://areweanticheatyet.com/${icons.find(item => item[0] === anticheat)![1]}" width="16" height="16"/>${anticheatStatus(anticheat)}${anticheat}</li>`).join('\n')}
            </ul>`
            :
            ''
        }
                
        ${(newGame.updates.length > 0 && (!oldGame || JSON.stringify(oldGame.updates) !== JSON.stringify(newGame.updates))) ?
            `<b>📋 Updates</b><br/>
            <dl>
            ${newGame.updates.map(update =>
                `<dd><a target="_blank" href="${update.reference}">${updateStatus(update)}${update.name} (${new Date(update.date).toDateString()})</a></dd>
                <dt><blockquote>${update.referenceDescription ? update.referenceDescription : '<i>No description available</i>'}</blockquote></dt>`
            ).join('\n')}
            </dl>`
            :
            ''
        }

        ${(newGame.notes.length > 0 && (!oldGame || JSON.stringify(oldGame.notes) !== JSON.stringify(newGame.notes))) ?
            `<b>📝 Notes</b><br/>
            <ul>
            ${newGame.notes.map(note =>
                `<li><a target="_blank" href="${note[1]}">${note[0]}</a></li>`
            ).join('\n')}
            </ul>`
            :
            ''
        }`;
}

function generateRSS(changes: [Game, Game?][], icons: (string | null)[][]) {
    const rssContent = fs.readFileSync(argv[4]).toString();

    const doc = parseXml(rssContent);
    const channel = doc.get('//channel')!;

    if (changes.length > 0) {
        const item = channel.node('item');
        const description = changes.map(change => generateDescription(change[1], change[0], icons));

        item.node('description').text(description.join('\n'));
        item.node('title').text(`${changes.length} Updates`);
        item.node('pubDate').text(new Date().toUTCString());
    }

    fs.writeFileSync(argv[4], doc.toString(false));
}

(async () => {
    const current: Game[] = await fetchReferenceTitles(await downloadImagesAndSetLogo(JSON.parse(fs.readFileSync(argv[2]).toString())));
    const previous: Game[] = JSON.parse(fs.readFileSync(argv[3]).toString());
    const icons = generateAntiCheatIconLookUp(current);

    generateRSS(getChanges(previous, current), icons);
})();
