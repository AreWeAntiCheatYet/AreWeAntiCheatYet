import Games from '../../games.json';
import icons, { StatusStyle } from '../app/icons';
import { Game } from '../types/games';

export function query(filter: (game: Game) => boolean) {
  return Games.filter((x) => filter(x as unknown as Game));
}

export function stats(): { supported: number; running: number; planned: number; broken: number; denied: number } {
  const statuses = new Set(Games.map((x) => x.status));

  const rtn = {};

  for (const status of statuses) {
    rtn[status.toLowerCase()] = query((x) => x.status === status).length;
  }

  return rtn as ReturnType<typeof stats>;
}

export function paginate(chunkSize: number) {
  const rtn: Game[][] = [];

  for (let i = 0; chunkSize > i; i++) {
    const start = chunkSize * i;
    const end = i === chunkSize - 1 ? undefined : chunkSize * (i + 1);

    rtn.push(Games.slice(start, end) as Game[]);
  }

  return rtn;
}

export function getStyle(status: Game['status']) {
  return icons[status.toLowerCase()] as StatusStyle;
}

export function getLogo(anticheat: string) {
  const logo_map = new Map([
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
    ['expert', 'anticheat-expert.webp'],
    ['nexon', 'nexon.webp'],
    ['neac', 'neac.webp'],
    ['saberclaw', 'saberclaw.webp'],
    ['faceit', 'faceit.webp'],
    ['esea', 'esea.webp'],
    ['hyperion', 'hyperion.webp'],
  ]);

  const file = logo_map.get(anticheat.toLowerCase());
  return file ? `/anticheats/${file}` : undefined;
}
