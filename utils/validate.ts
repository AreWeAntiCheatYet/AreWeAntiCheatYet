/* eslint-disable no-console */
/* eslint-disable guard-for-in */
import dayjs from 'dayjs';
import Games from '../games.json';

const errors = [];
const validStatus = ['Broken', 'Running', 'Supported', 'Planned', 'Denied'];

for (const [index, game] of Games.entries()) {
    if (!game.name) {
        errors.push(`${index} is missing a name`);
    }
    if (game.url.includes(' ')) {
        errors.push(`${game.name} contains white-space in url`);
    }
    if (!Array.isArray(game.notes)) {
        errors.push(`${game.name} has malformed notes`);
    }
    for (const note of game.notes) {
        if (!Array.isArray(note)) {
            errors.push(`${game.name} contains invalid note`);
        }
        if (note.length !== 2) {
            errors.push(`${game.name} contains note with too few arguments`);
        }
    }
    if (!validStatus.includes(game.status)) {
        errors.push(`${game.name} has invalid status`);
    }
    if (typeof game.storeIds !== 'object' || game.storeIds === null) {
        errors.push(`${game.name} has malformed storeIds`);
    }
    if (game.storeIds.epic) {
        if (!game.storeIds.epic.namespace) {
            errors.push(`${game.name} is missing epic namespace`);
        }
        if (!game.storeIds.epic.slug) {
            errors.push(`${game.name} is missing epic slug`);
        }
    }
    for (const update of game.updates) {
        if (!dayjs(update.date).isValid()) {
            errors.push(`${game.name} has invalid date`);
        }
        if (!update.name) {
            errors.push(`${game.name} is missing update name`);
        }
        if (!update.reference) {
            errors.push(`${game.name} is missing reference`);
        }
    }
}

if (errors.length !== 0) {
    for (const error of errors) {
        console.error(error);
    }
    process.exit(1);
} else {
    console.log('All valid!');
    process.exit(0);
}
