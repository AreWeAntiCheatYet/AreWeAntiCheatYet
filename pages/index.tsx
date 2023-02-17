import { Blockquote, Stack } from '@mantine/core';
import { InferGetStaticPropsType } from 'next';
import { useContext } from 'react';
import GameGrid from '../components/GameGrid';
import GameTable from '../components/GameTable';
import Legend from '../components/Legend';
import Overview from '../components/Overview';
import { SettingsContext } from '../src/static/state';
import { allImages } from '../src/assets';
import { Games, paginationSize } from '../src/static';
import { paginate, stats } from '../src/utils/games';

// TODO: "Request Changes" Page

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
    <>
      <noscript>
        <a href="/no-js">You can find the non-javascript page without pagination here.</a>
        <style> {'.needsJavascript { display: none }'} </style>
      </noscript>

      <Stack className="needsJavascript" align="center" mt={70}>
        <Blockquote cite="- Starz0r" mb={50}>
          A comprehensive and crowd-sourced list of games using anti-cheats and their compatibility with GNU/Linux or
          Wine/Proton.
        </Blockquote>

        <Overview variant={overview} {...props} />
        <Legend />
        {display === 'grid' ? (
          <GameGrid page={1} totalPages={totalPages} games={currentGames} assets={images} mt={50} mb={20} />
        ) : (
          <GameTable page={1} totalPages={totalPages} assets={images} games={currentGames} mt={50} mb={20} />
        )}
      </Stack>
    </>
  );
}
