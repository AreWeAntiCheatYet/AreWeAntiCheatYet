import { Game } from './types';

export function getChanges(current: Game[], previous: Game[]) {
  return current
    .filter(
      (game: any) =>
        previous.find(
          (item: any) =>
            item.name === game.name &&
            (JSON.stringify(item.reference) !== JSON.stringify(game.reference) ||
              (game.updates.length > 0 &&
                JSON.stringify(item.updates) !== JSON.stringify(game.updates)) ||
              JSON.stringify(item.notes) !== JSON.stringify(game.notes) ||
              item.status !== game.status ||
              item.native !== game.native)
        ) || !previous.find((item: any) => item.name === game.name)
    )
    .map((game: any) => [game, previous.find((item: any) => item.name === game.name)]);
}

export function describeChanges(current: Game, previous?: Game) {
  let changes = '';

  if (!previous) {
    changes = `New Game: "${current.name}"<br>`;
    changes += `&emsp;- Status: ${current.status}${current.native ? ' & Native' : ''}<br>`;
    changes += `&emsp;- AntiCheat(s): ${current.anticheats.join(', ')}<br>`;

    if (current.notes && current.notes.length > 0) {
      changes += '&emsp;- Notes<br>';
      for (const note of current.notes) {
        changes += `&emsp;&emsp;- ${note[0]} (${note[1]})<br>`;
      }
    }

    if (current.updates && current.updates.length > 0) {
      changes += '&emsp;- Updates<br>';
      for (const update of current.updates) {
        changes += `&emsp;&emsp;- ${new Date(update.date).toDateString()}: ${update.name} (${
          update.reference
        })<br>`;
      }
    }
  } else {
    changes = `"${current.name}" Updated<br>`;

    if (previous.native !== current.native) {
      if (previous.native && !current.native) {
        changes += '&emsp;- No longer natively supported<br>';
      } else {
        changes += '&emsp;- Now natively supported!<br>';
      }
    }

    if (previous.reference !== current.reference) {
      changes += `&emsp;- Reference changed: ${current.reference}<br>`;
    }

    if (previous.status !== current.status) {
      changes += `&emsp;- Status changed: ${previous.status} => ${current.status}<br>`;
    }

    for (const note of previous.notes) {
      if (!current.notes.find((item) => JSON.stringify(item) === JSON.stringify(note))) {
        changes += `&emsp;- Removed note: ${note[0]} (${note[1]})<br>`;
      }
    }

    for (const note of current.notes) {
      if (!previous.notes.find((item) => JSON.stringify(item) === JSON.stringify(note))) {
        changes += `&emsp;- New note: ${note[0]} (${note[1]})<br>`;
      }
    }

    for (const update of current.updates) {
      if (!previous.updates || !previous.updates.includes(update)) {
        changes += `&emsp;- New update (${new Date(update.date).toDateString()}): ${update.name} (${
          update.reference
        })<br>`;
      }
    }
  }

  return changes;
}
