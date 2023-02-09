// import { createWriteStream } from 'fs';
import { Asset } from '../types/assets';
import { Game } from '../types/games';
// import steamgriddb from './provider/steamgriddb';
import Games from '../../games.json';
// import { finished } from 'stream/promises';
// import { Readable } from 'stream';
// import { cwd } from 'process';

export default async function (game: Game): Promise<Partial<Asset>> {
  // const providers = [steamgriddb];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const id = Games.indexOf(game as any);
  // const { name } = game;

  // const result: Partial<Asset> = {};

  // for (const provider of providers) {
  //   const providerResult = await provider(name);
  //   const banner = providerResult?.banner;
  //   const logo = providerResult?.logo;

  //   if (!result.banner && banner) {
  //     result.banner = banner;
  //   }

  //   if (!result.logo && logo) {
  //     result.logo = logo;
  //   }

  //   if (result.logo && result.banner) {
  //     break;
  //   }
  // }

  // const currentDir = cwd();

  // if (result.banner) {
  //   const image = await fetch(result.banner);
  //   const stream = createWriteStream(`${currentDir}/public/assets/banner-${id}.png`);

  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   await finished(Readable.fromWeb(image.body as any).pipe(stream));
  // }

  // if (result.logo) {
  //   const image = await fetch(result.banner);
  //   const stream = createWriteStream(`${currentDir}/public/assets/logo-${id}.png`);

  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   await finished(Readable.fromWeb(image.body as any).pipe(stream));
  // }

  return { banner: `/assets/banner-${id}.png`, logo: `/assets/logo-${id}.png` };
}
