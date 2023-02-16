import { OptionsType } from 'cookies-next/lib/types';
import GamesJSON from '../../games.json';
import { Game } from '../types/games';

export const paginationSize = 16;
export const Games = GamesJSON as Game[];
export const cookieOptions: OptionsType = { maxAge: 60 * 60 * 24, sameSite: true };
