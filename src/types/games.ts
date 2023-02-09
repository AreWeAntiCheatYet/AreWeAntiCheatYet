export type Status = 'Broken' | 'Running' | 'Denied' | 'Supported' | 'Planned';

// TODO: Change to dayjs date and overwrite at compile time?

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
  name: string;
  logo: string;
  native: boolean;

  status: Status;
  reference: string;
  anticheats: string[];

  updates: Update[];
  notes: [string, string][];

  storeIds: StoreIds;
}
