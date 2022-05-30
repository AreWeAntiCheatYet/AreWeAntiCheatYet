export interface Update {
  date: string;
  name: string;
  reference: string;
  referenceTitle: string;
}

export interface Game {
  url: string;
  name: string;
  logo: string;
  status: string;
  native: boolean;
  reference: string;
  anticheats: string[];
  notes: string[][];
  updates: Update[];
}
