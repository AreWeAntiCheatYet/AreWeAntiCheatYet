import { createWriteStream } from 'fs';
import { access, constants } from 'fs/promises';
import { cwd } from 'process';
import { Readable } from 'stream';
import { finished } from 'stream/promises';
import { Asset } from '../types/assets';
import { Game } from '../types/games';
import steamgriddb from './provider/steamgriddb';

async function download(game: Game): Promise<Partial<Asset>> {
  const providers = [steamgriddb];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { slug, name } = game;

  const result: Partial<Asset> = {};

  for (const provider of providers) {
    const providerResult = await provider(name);
    const banner = providerResult?.banner;
    const logo = providerResult?.logo;

    if (!result.banner && banner) {
      result.banner = banner;
    }

    if (!result.logo && logo) {
      result.logo = logo;
    }

    if (result.logo && result.banner) {
      break;
    }
  }

  const currentDir = cwd();

  if (result.banner) {
    const image = await fetch(result.banner);
    const stream = createWriteStream(`${currentDir}/public/assets/banner-${slug}.png`);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await finished(Readable.fromWeb(image.body as any).pipe(stream));
  }

  if (result.logo) {
    const image = await fetch(result.banner);
    const stream = createWriteStream(`${currentDir}/public/assets/logo-${slug}.png`);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await finished(Readable.fromWeb(image.body as any).pipe(stream));
  }

  return { banner: `/assets/banner-${slug}.png`, logo: `/assets/logo-${slug}.png` };
}

export async function allImages(chunk: Game[]): Promise<[string, Partial<Asset>][]> {
  const rtn = [];

  for (const game of chunk) {
    rtn.push([game.slug, await assets(game)]);
  }

  return rtn;
}

export default async function assets(game: Game): Promise<Partial<Asset>> {
  const { slug } = game;

  try {
    await access(`public/assets/banner-${slug}.png`, constants.R_OK);
    await access(`public/assets/logo-${slug}.png`, constants.R_OK);

    return { banner: `/assets/banner-${slug}.png`, logo: `/assets/logo-${slug}.png` };
  } catch (e) {
    return await download(game);
  }
}
