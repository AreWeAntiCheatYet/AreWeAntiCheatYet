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
          (item) => item.name === game.name && JSON.stringify(item) !== JSON.stringify(game)
        ) || !old.find((item) => item.name === game.name)
    )
    .map((game) => [game, old.find((item) => item.name === game.name)]);
}
