export type Status = 'Broken' | 'Running' | 'Denied' | 'Supported' | 'Planned';

export interface Update {
  name: string;
  date: string;

  reference: string;
}

export interface StoreIds {
  epic?: {
    namespace: string;
    slug: string;
  };
  steam?: string;
}

export interface Game {
  url: string;
  slug: string;
  name: string;
  logo: string;
  native: boolean;

  status: Status;
  reference: string;
  anticheats: string[];

  updates: Update[];
  notes: [text: string, reference: string][];

  storeIds: StoreIds;
}

export interface Change {
  old?: Game;
  recent: Game;
  changedProperties?: (keyof Game)[];
}
