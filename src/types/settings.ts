export interface Settings {
  overview: 'simple' | 'detailed' | 'ring';
}

export const defaultSettings: Settings = { overview: 'ring' };
