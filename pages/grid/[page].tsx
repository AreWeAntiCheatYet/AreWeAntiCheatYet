import { Blockquote, Stack } from '@mantine/core';
import { InferGetStaticPropsType } from 'next';
import { useContext } from 'react';
import GameGrid from '../../components/GameGrid';
import Legend from '../../components/Legend';
import Overview from '../../components/Overview';
import { SettingsContext } from '../../src/static/state';
import { allImages } from '../../src/assets';
import { Games, paginationSize } from '../../src/static';
import { paginate, stats } from '../../src/utils/games';
import BreakdownLink from '../../components/BreakdownLink';

export const getStaticProps = async ({ params: { page: _page } }) => {
  const page = parseInt(_page);
  const paginated = paginate(paginationSize);

  const images = await allImages(Games);

  const currentGames = paginated.at(page - 1);
  const totalPages = paginated.length;

  const { ...statuses } = stats();
  const total = Games.length;

  return { props: { ...statuses, total, page, totalPages, currentGames, images } };
};

export const getStaticPaths = async () => {
  const paginated = paginate(paginationSize);
  const paths = paginated.map((_v, index) => ({ params: { page: (index + 1).toString() } }));

  return { paths, fallback: false };
};

export default function ({
  page,
  totalPages,
  currentGames,
  images: _images,
  ...props
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { overview } = useContext(SettingsContext);
  const images = new Map(_images);

  return (
    <Stack align="center" mt={70}>
      <Blockquote cite="- Starz0r" mb={50}>
        A comprehensive and crowd-sourced list of games using anti-cheats and their compatibility with GNU/Linux or
        Wine/Proton.
      </Blockquote>

      <Overview variant={overview} {...props} />
      <Legend mt={30} />
      <BreakdownLink />
      <GameGrid page={page} totalPages={totalPages} games={currentGames} assets={images} mt={50} mb={20} />
    </Stack>
  );
}
