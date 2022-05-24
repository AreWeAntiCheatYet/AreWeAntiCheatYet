import Game, { GameStatus } from '../types/game';
import Overview from '../types/overview';

export async function fixIcons(games: Game[]) {
  const gamesWithIcons = [...games];
  const gamesWithNoIcon = games.filter((game) => !game.logo);

  const icons = await Promise.all(
    games.map((game) =>
      fetch(
        `https://api.allorigins.win/get?url=https://www.igdb.com/search_autocomplete_all?q=${game.name}`
      )
    )
  );

  for (const [index, request] of icons.entries()) {
    if (request.ok) {
      const game = gamesWithNoIcon[index];
      // eslint-disable-next-line no-await-in-loop
      const suggestedIcons = JSON.parse((await request.json()).contents);

      gamesWithIcons.find(
        (item) => item.name === game.name
      )!.logo = `https://images.igdb.com/igdb/image/upload/t_cover_big/${suggestedIcons.game_suggest[0].cloudinary}.png`;
    }
  }

  return gamesWithIcons;
}

export function generateOverview(games: Game[]) {
  const overview: Overview = {
    total: games.length,
    broken: 0,
    denied: 0,
    planned: 0,
    running: 0,
    supported: 0,
  };

  for (const game of games) {
    switch (game.status) {
      case GameStatus.broken:
        overview.broken++;
        break;
      case GameStatus.denied:
        overview.denied++;
        break;
      case GameStatus.planned:
        overview.planned++;
        break;
      case GameStatus.running:
        overview.running++;
        break;
      case GameStatus.supported:
        overview.supported++;
        break;
    }
  }

  return overview;
}

export function generateBreakdown(games: Game[]) {
  const breakdown = new Map(
    [...new Set(games.flatMap((game) => game.anticheats))].map<[string, Overview]>((anticheat) => [
      anticheat,
      { total: 0, broken: 0, denied: 0, planned: 0, running: 0, supported: 0 },
    ])
  );

  for (const game of games) {
    for (const anticheat of game.anticheats) {
      breakdown.get(anticheat)!.total++;

      switch (game.status) {
        case GameStatus.broken:
          breakdown.get(anticheat)!.broken++;
          break;
        case GameStatus.denied:
          breakdown.get(anticheat)!.denied++;
          break;
        case GameStatus.planned:
          breakdown.get(anticheat)!.planned++;
          break;
        case GameStatus.running:
          breakdown.get(anticheat)!.running++;
          break;
        case GameStatus.supported:
          breakdown.get(anticheat)!.supported++;
          break;
      }
    }
  }

  return Array.from(breakdown);
}

export function generateAntiCheatIconLookUp(games: Game[]) {
  const logo_map = [
    ['easy anti-cheat', 'eac.webp'],
    ['battleye', 'battleye.webp'],
    ['equ8', 'equ8.webp'],
    ['vanguard', 'vanguard.webp'],
    ['fairfight', 'fairfight.webp'],
    ['punkbuster', 'punkbuster.webp'],
    ['vac', 'vac.webp'],
    ['xign', 'xigncode3.webp'],
    ['treyarch', 'treyarch.webp'],
    ['arbiter', 'arbiter.webp'],
    ['nprotect', 'nprotect.webp'],
    ['ricochet', 'ricochet.webp'],
    ['mail.ru', 'mailru.webp'],
    ['mihoyo', 'mihoyo.webp'],
    ['nexon', 'nexon.webp'],
    ['neac', 'neac.webp'],
    ['sabreclaw', 'sabreclaw.webp'],
  ];

  return [...new Set(games.flatMap((game) => game.anticheats))].map((anticheat) => [
    anticheat,
    logo_map.find((item) => anticheat.toLowerCase().includes(item[0]))
      ? `anticheats/${logo_map.find((item) => anticheat.toLowerCase().includes(item[0]))![1]}`
      : null,
  ]);
}

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
