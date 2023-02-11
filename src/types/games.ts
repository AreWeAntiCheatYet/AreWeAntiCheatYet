export type Status = 'Broken' | 'Running' | 'Denied' | 'Supported' | 'Planned';

export interface Update {
  name: string;
  date: string;
  reference: string;
}

export interface StoreIds {
  steam?: string;
  epic?: { namespace: string; slug: string };
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
