import { Blockquote, Container, Stack } from '@mantine/core';
import { InferGetStaticPropsType } from 'next';
import { useContext } from 'react';
import GameGrid from '../../components/GameGrid';
import Legend from '../../components/Legend';
import Overview from '../../components/Overview';
import Games from '../../games.json';
import { SettingsContext } from '../../src/app/state';
import assets from '../../src/assets';
import { Asset } from '../../src/types/assets';
import { paginate, stats } from '../../src/utils/games';

export const getStaticProps = async ({ params: { page: _page } }) => {
  const page = parseInt(_page);
  const paginated = paginate(16);
  const totalPages = paginated.length;
  const currentGames = paginated.at(page - 1);

  const images = await Promise.all(
    currentGames.map((game) => assets(game).then((asset) => [game.slug, asset] as [string, Partial<Asset>])),
  );

  const { ...statuses } = stats();
  const total = Games.length;

  return { props: { ...statuses, total, page, totalPages, currentGames, images } };
};

export const getStaticPaths = async () => {
  const paginated = paginate(16);
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
    <Container fluid>
      <Stack align="center" mt={70}>
        <Blockquote cite="- Starz0r" mb={50}>
          A comprehensive and crowd-sourced list of games using anti-cheats and their compatibility with GNU/Linux or
          Wine/Proton.
        </Blockquote>

        <Overview variant={overview} {...props} />
        <Legend />
        <GameGrid page={page} totalPages={totalPages} games={currentGames} assets={images} />
      </Stack>
    </Container>
  );
}
