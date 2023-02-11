import { Blockquote, Stack } from '@mantine/core';
import { InferGetStaticPropsType } from 'next';
import { useContext } from 'react';
import GameGrid from '../components/GameGrid';
import Legend from '../components/Legend';
import Overview from '../components/Overview';
import { SettingsContext } from '../src/app/state';
import { allImages } from '../src/assets';
import { Games, paginationSize } from '../src/static';
import { paginate, stats } from '../src/utils/games';

// TODO: "Request Changes" Page
// TODO: Credit Steamgribddb --> Have Credit Button besides settings button, and also show credits to steamgriddb when hovering radiobanner for "game card view"
// TODO: Old Table Layout

export const getStaticProps = async () => {
  const paginated = paginate(paginationSize);

  const images = await allImages(Games);
  const currentGames = paginated.at(0);
  const totalPages = paginated.length;

  const { ...statuses } = stats();
  const total = Games.length;

  return { props: { ...statuses, total, totalPages, currentGames, images } };
};

export default function ({
  totalPages,
  currentGames,
  images: _images,
  ...props
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { overview, display } = useContext(SettingsContext);
  const images = new Map(_images);

  return (
    <Stack align="center" mt={70}>
      <Blockquote cite="- Starz0r" mb={50}>
        A comprehensive and crowd-sourced list of games using anti-cheats and their compatibility with GNU/Linux or
        Wine/Proton.
      </Blockquote>

      <Overview variant={overview} {...props} />
      <Legend />
      {display === 'grid' ? <GameGrid page={1} totalPages={totalPages} games={currentGames} assets={images} /> : <></>}
    </Stack>
  );
}
