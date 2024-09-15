import icons, { StatusStyle } from '../static/icons';
import { Games } from '../static';
import { Change, Game, Status } from '../types/games';
import { useRouter } from 'next/router';

export function query(filter: (game: Game) => boolean, games = Games) {
  return games.filter(filter);
}

export function filter(query: string) {
  const lowerQuery = query.toLowerCase();

  return Games.filter(
    (game) =>
      game.name.toLowerCase().includes(lowerQuery) ||
      game.notes.join().toLowerCase().includes(lowerQuery) ||
      game.anticheats.join().toLowerCase().includes(lowerQuery) ||
      game.slug.toLowerCase().includes(lowerQuery) ||
      game.status.toLowerCase().includes(lowerQuery),
  );
}

export function sort(by: 'name' | 'status' | 'updates', order: 'asc' | 'desc', games = [...Games]) {
  const preSorted = games.sort((a, b) => Games.indexOf(a) - Games.indexOf(b));

  const sorted = preSorted.sort((a, b) => {
    const first: Game = order === 'desc' ? a : b;
    const second: Game = order === 'desc' ? b : a;

    switch (by) {
      case 'name':
        return first.name.localeCompare(second.name);
      case 'status': {
        const order: Status[] = ['Supported', 'Running', 'Planned', 'Broken', 'Denied'];
        return order.indexOf(second.status) - order.indexOf(first.status);
      }
      case 'updates': {
        return first.updates.length > 0 && second.updates.length > 0
          ? new Date(first.updates.at(-1)?.date).getTime() - new Date(second.updates.at(-1)?.date).getTime()
          : first.updates.length - second.updates.length;
      }
    }
  });

  return sorted;
}

export function stats(games = Games): {
  supported: number;
  running: number;
  planned: number;
  broken: number;
  denied: number;
} {
  const statuses = new Set(Games.map((x) => x.status));

  const rtn = {};

  for (const status of statuses) {
    rtn[status.toLowerCase()] = query((x) => x.status === status, games).length;
  }

  return rtn as ReturnType<typeof stats>;
}

export function paginate(chunkSize: number, games = Games) {
  const rtn: Game[][] = [];

  for (let i = 0; games.length / chunkSize > i; i++) {
    const start = chunkSize * i;
    const end = chunkSize * (i + 1);

    rtn.push(games.slice(start, end));
  }

  return rtn;
}

export function getStyle(status: Game['status']) {
  return icons[status.toLowerCase()] as StatusStyle;
}

export function getLogo(anticheat: string) {
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
    ['nprotect g', 'nprotect.webp'],
    ['ricochet', 'ricochet.webp'],
    ['mail.ru', 'mailru.webp'],
    ['mihoyo', 'mihoyo.webp'],
    ['netease','nace.webp'],
    ['expert', 'anticheat-expert.webp'],
    ['nexon', 'nexon.webp'],
    ['neac', 'neac.webp'],
    ['saberclaw', 'saberclaw.webp'],
    ['faceit', 'faceit.webp'],
    ['esea', 'esea.webp'],
    ['hyperion', 'hyperion.webp'],
    ['denuvo', 'denuvo.webp'],
    ['ea a', 'ea.webp'],
    ['crackproof', 'crackproof.webp'],
    ['esl', 'esl.webp'],
    ['seasun','seasun.webp'],
    ['wfsdrv','wfsdrv.webp'],
    ['violet','violet.webp'],
	['active', 'active.webp'],
	['sard', 'sard.webp'],
	['frost', 'frost.webp'],
	['arkos', 'arkos.webp'],
	['tenprotect', 'tenprotect.webp']
  ];

  const file = logo_map.find((x) => anticheat.toLowerCase().includes(x[0]))?.[1];
  const { basePath } = useRouter();

  return file ? `${basePath}/anticheats/${file}` : undefined;
}

export function getChanges(current: Game[], previous: Game[]) {
  const propertiesToCheck: (keyof Game)[] = ['anticheats', 'native', 'notes', 'reference', 'status', 'updates'];
  const rtn: Change[] = [];

  for (const recent of current) {
    const old = previous.find((old) => old.slug === recent.slug || old.name === recent.name);

    if (!old) {
      rtn.push({ recent });
      continue;
    }

    const changedProperties = [];

    for (const property of propertiesToCheck) {
      if (old?.[property]?.toString() !== recent?.[property]?.toString()) {
        changedProperties.push(property);
      }
    }

    if (changedProperties.length <= 0) {
      continue;
    }

    rtn.push({ recent, old, changedProperties });
  }

  return rtn;
}
