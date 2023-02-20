import GamesJSON from '../../games.json';
import { Game } from '../types/games';

export const paginationSize = 16;
export const Games = GamesJSON as Game[];
