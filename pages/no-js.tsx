import { Blockquote, Card, Stack } from '@mantine/core';
import { InferGetStaticPropsType } from 'next';
import BreakdownLink from '../components/BreakdownLink';
import GameTable from '../components/GameTable';
import { Description } from '../components/Legend';
import Overview from '../components/Overview';
import { allImages } from '../src/assets';
import { Games } from '../src/static';
import { stats } from '../src/utils/games';

export const getStaticProps = async () => {
  const images = await allImages(Games);
  const { ...statuses } = stats();
  const total = Games.length;

  return { props: { ...statuses, total, images } };
};

export default function ({ images: _images, ...props }: InferGetStaticPropsType<typeof getStaticProps>) {
  const images = new Map(_images);

  return (
    <>
      <Stack align="center" mt={70}>
        <Blockquote cite="- Starz0r" mb={50}>
          A comprehensive and crowd-sourced list of games using anti-cheats and their compatibility with GNU/Linux or
          Wine/Proton.
        </Blockquote>

        <Overview variant="ring" {...props} />
        <Card mt={30} sx={{ width: '60%' }}>
          <Description />
        </Card>
        <BreakdownLink />
        <GameTable assets={images} games={[...Games]} style={{ width: '80%' }} mt={50} mb={20} />
      </Stack>
    </>
  );
}
