import Games from '../../games.json';

export interface Settings {
  previousGames: string;
  display: 'table' | 'grid';
  overview: 'simple' | 'detailed' | 'ring';
}

export const defaultSettings: Settings = { overview: 'ring', display: 'table', previousGames: JSON.stringify(Games) };
