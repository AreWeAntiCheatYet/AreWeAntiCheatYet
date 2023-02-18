import { writeFile } from 'fs/promises';
import { allImages } from '../src/assets';
import { Games } from '../src/static';

(async () => {
  const images = await allImages(Games);
  await writeFile('prefetched.json', JSON.stringify(images));
})();
