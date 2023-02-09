import { Pagination, SimpleGrid, SimpleGridProps, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';
import { Asset } from '../src/types/assets';
import { Game } from '../src/types/games';
import GameCard from './GameCard';

interface GameGridProps extends Omit<SimpleGridProps, 'cols' | 'spacing' | 'breakpoints'> {
  assets: Partial<Asset>[];
  paginatedGames: Game[][];
}

export default function ({ paginatedGames, assets, ...props }: GameGridProps) {
  const [page, setPage] = useState(0);
  const currentGames = paginatedGames[page];
  const breakpoint = useMediaQuery('(min-width: 1200px)') ?? true;

  return (
    <Stack align="center" mb={20}>
      <SimpleGrid
        spacing="xl"
        cols={4}
        breakpoints={[
          { cols: 2, maxWidth: 1335 },
          { cols: 1, maxWidth: 715 },
        ]}
        {...props}
      >
        {currentGames.map((game, index) => {
          const { name } = game;
          const id = paginatedGames.length * page + index;
          return <GameCard key={name} gameId={id} game={game} banner={assets[id].banner} />;
        })}
      </SimpleGrid>
      <Pagination
        radius="md"
        page={page + 1}
        total={paginatedGames.length}
        size={breakpoint ? 'lg' : undefined}
        onChange={(val) => setPage(val - 1)}
      />
    </Stack>
  );
}
