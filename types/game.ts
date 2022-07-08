export enum GameStatus {
  broken = 'Broken',
  denied = 'Denied',
  planned = 'Planned',
  running = 'Running',
  supported = 'Supported',
}

export interface EpicID {
  namespace: string;
  slug: string;
}

export interface StoreIDs {
  steam?: string;
  epic?: EpicID;
}

export interface Update {
  date: string;
  name: string;
  reference: string;
  referenceTitle: string;
  referenceDescription: string;
}

export default interface Game {
  url: string;
  name: string;
  logo: string;
  native: boolean;
  status: GameStatus;
  reference: string;
  anticheats: string[];
  notes: string[][];
  updates: Update[];
  storeIds: StoreIDs;
}
