import { Games } from '../static';

export interface Settings {
  previousGames: string;
  display: 'table' | 'grid';
  rowHighlight: 'true' | 'false';
  overview: 'simple' | 'detailed' | 'ring';
}

export const defaultSettings: Settings = {
  display: 'table',
  overview: 'ring',
  rowHighlight: 'false',
  previousGames: JSON.stringify(Games),
};
