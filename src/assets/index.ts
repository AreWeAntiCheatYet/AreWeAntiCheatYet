import { readFile } from 'fs/promises';
import { Asset } from '../types/assets';
import { Game } from '../types/games';
import steamgriddb from './provider/steamgriddb';

export async function request(...args: Parameters<typeof fetch>) {
  try {
    return await fetch(...args);
  } catch (error) {
    console.warn(`[Assets] Request failed: "${error}, retrying...."`);
    return request(...args);
  }
}

export async function assets(game: Game): Promise<Partial<Asset>> {
  const providers = [steamgriddb];
  const cache = await hasCache();
  const { name } = game;

  if (cache) {
    return cache.find((x) => x[0] === game.slug)[1];
  }

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

  return result;
}

export async function allImages(chunk: Game[]): Promise<[string, Partial<Asset>][]> {
  const cache = await hasCache();
  const rtn = [];

  if (cache) {
    return cache;
  }

  for (const game of chunk) {
    rtn.push([game.slug, await assets(game)]);
  }

  return rtn;
}

async function hasCache(): Promise<false | [string, Partial<Asset>][]> {
  try {
    const contents = await readFile('prefetched.json');
    return JSON.parse(contents.toString());
  } catch (error) {
    return false;
  }
}
