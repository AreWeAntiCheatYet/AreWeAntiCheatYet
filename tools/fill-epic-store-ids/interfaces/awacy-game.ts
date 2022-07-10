export interface AwacyGame {
  url: string;
  name: string;
  logo: string;
  native: boolean;
  status: string;
  reference: string;
  anticheats?: (string | null)[] | null;
  notes?: (string[] | null)[] | null;
  updates?: (UpdatesEntity | null)[] | null;
  storeIds: StoreIds;
}

export interface AwacyGameInternal extends AwacyGame {
  simplifiedName: string;
}

export interface UpdatesEntity {
  name: string;
  date: string;
  reference: string;
}
export interface StoreIds {
  steam?: string | null;
  epic?: Epic | null;
}
export interface Epic {
  namespace: string;
  slug: string;
}
