export enum GameStatus {
  broken = 'Broken',
  denied = 'Denied',
  planned = 'Planned',
  running = 'Running',
  supported = 'Supported',
}

export default interface Game {
  url: string;
  name: string;
  logo: string;
  since: string;
  native: boolean;
  reference: string;
  status: GameStatus;
  anticheats: string[];
  notes: string[][];
}
