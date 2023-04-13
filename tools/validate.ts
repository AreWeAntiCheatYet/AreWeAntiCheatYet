import { exit } from 'process';
import { Games } from '../src/static';

(async () => {
  for (const game of Games) {
    if (game.anticheats.length <= 0) {
      console.warn(game.name, 'has', 0, 'anticheats');
    }
    if (!game.slug) {
      console.error(game.name, 'has no slug');
      exit(1);
    }
    if (!game.name) {
      console.error(game, 'has no name');
      exit(1);
    }
    if (!game.status) {
      console.error(game.name, 'has no status');
      exit(1);
    }

    for (const note of game.notes) {
      if (!Array.isArray(note)) {
        console.error(game.name, 'has no array note', note);
        exit(1);
      }
      if (note.length != 2) {
        console.error(game.name, 'has invalid note', note);
        exit(1);
      }
    }

    for (const update of game.updates) {
      if (!update.date) {
        console.error(game.name, 'has bad update date', update);
        exit(1);
      }
      if (!update.name) {
        console.error(game.name, 'has bad update name', update);
        exit(1);
      }
      if (!update.reference) {
        console.error(game.name, 'has bad reference', update);
        exit(1);
      }
    }

    if (game.storeIds.epic) {
      if (!game.storeIds.epic.namespace) {
        console.error(game.name, 'is missing epic namespace');
      }
      if (!game.storeIds.epic.slug) {
        console.error(game.name, 'is missing epic slug');
      }
    }
  }
})();
