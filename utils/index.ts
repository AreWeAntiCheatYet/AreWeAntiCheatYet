import Game from '../types/game';

export function getLastGames(): Game[] | null {
  const previous = localStorage.getItem('previousGames');

  if (previous) {
    return JSON.parse(previous);
  }

  return null;
}

export function saveGamesList(games: Game[]) {
  localStorage.setItem('previousGames', JSON.stringify(games));
}

export function getChanges(old: Game[], current: Game[]): [Game, Game?][] {
  return current
    .filter(
      (game) =>
        old.find(
          (item) =>
            item.name === game.name &&
            (JSON.stringify(item.reference) !== JSON.stringify(game.reference) ||
              (game.updates && !item.updates) ||
              (game.updates &&
                item.updates &&
                JSON.stringify(item.updates.flatMap((update) => update.reference)) !==
                  JSON.stringify(game.updates.flatMap((update) => update.reference))) ||
              JSON.stringify(item.notes) !== JSON.stringify(game.notes) ||
              item.status !== game.status ||
              item.native !== game.native)
        ) || !old.find((item) => item.name === game.name)
    )
    .map((game) => [game, old.find((item) => item.name === game.name)]);
}
