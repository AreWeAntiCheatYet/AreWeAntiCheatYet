export type OfferType =
  | "games"
  | "games/edition"
  | "games/edition/base"
  | "addon"
  | "bundle";

export interface EpicGame {
  namespace: string;
  name: string;
  offerTypes: OfferType[];
  slug: string;
  simplifiedName: string;
}

export type EpicDataOfferList = [
  id: string,
  namespace: string,
  name: string,
  offerTypes: OfferType[],
  publisher: string,
  numericalIdOne: number,
  numericalIdTwo: number,
  pictureUrl: string,
  slug: string
];
