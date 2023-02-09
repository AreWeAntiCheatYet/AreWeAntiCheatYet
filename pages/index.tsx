import { Blockquote, Container, Stack } from '@mantine/core';
import { InferGetStaticPropsType } from 'next';
import { useContext } from 'react';
import GameGrid from '../components/GameGrid';
import Legend from '../components/Legend';
import Overview from '../components/Overview';
import Games from '../games.json';
import { SettingsContext } from '../src/app/state';
import assets from '../src/assets';
import { Game } from '../src/types/games';
import { paginate, stats } from '../src/utils/games';

export const getStaticProps = async () => {
  const images = await Promise.all(Games.map((x) => assets(x as Game)));
  const paginatedGames = paginate(16);
  const { ...statuses } = stats();
  const total = Games.length;

  return { props: { ...statuses, total, paginatedGames, images } };
};

// TODO: Add "id" to games.json, which is either a slug or the games steam-id
// TODO: Optimize Components, i.e. replace Container with Box
// TODO: "Request Changes" Page
// TODO: Search that opens card
// TODO: Credit Steamgribddb
// TODO: Old Table Layout
// TODO: Fix Pagination Component on mobile

export default function ({ paginatedGames, images, ...props }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { overview } = useContext(SettingsContext);

  return (
    <Container fluid>
      <Stack align="center" mt={70}>
        <Blockquote cite="- Starz0r" mb={50}>
          A comprehensive and crowd-sourced list of games using anti-cheats and their compatibility with GNU/Linux or
          Wine/Proton.
        </Blockquote>

        <Overview variant={overview} {...props} />
        <Legend />
        <GameGrid paginatedGames={paginatedGames} assets={images} />
      </Stack>
    </Container>
  );
}
