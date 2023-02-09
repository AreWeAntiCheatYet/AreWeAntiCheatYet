import { Asset } from '../../types/assets';

interface Response<T> {
  data: T[];
  success: boolean;
}

interface SearchData {
  id: number;
  name: string;
  types: string[];
  verified: boolean;
  release_date: number;
}

interface ResultData {
  id: number;
  url: string;
  score: number;
  width: number;
  nsfw: boolean;
  height: number;
  epilepsy: boolean;
}

async function request<T>(endpoint: string) {
  const apiKey = process.env.STEAMGRIDDB_KEY;
  const baseUrl = 'https://www.steamgriddb.com/api/v2/';

  const result = await fetch(`${baseUrl}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    method: 'GET',
  });

  if (!result.ok) {
    console.error(`[SteamGridDB] Request to "${endpoint}" failed: ${result.status} (${result.statusText})`);
    return undefined;
  }

  return JSON.parse(await result.text()) as T;
}

export default async function (name: string): Promise<Asset> {
  const search = await request<Response<SearchData>>(`search/autocomplete/${name}`);

  if (!search || !search.success || search.data.length <= 0) {
    console.warn(`[SteamGridDB] Search for "${name}" failed: ${JSON.stringify(search)}`);
    return undefined;
  }

  const { id } = search.data[0];

  const grids = (await request<Response<ResultData>>(`grids/game/${id}`))?.data;
  const logos = (await request<Response<ResultData>>(`grids/game/${id}`))?.data;

  const filter = (x: ResultData) => !x.epilepsy && !x.nsfw;

  return { banner: grids.find(filter)?.url || '', logo: logos.find(filter)?.url || '' };
}
