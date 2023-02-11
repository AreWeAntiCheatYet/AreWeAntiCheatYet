import { Group, Pagination, Select, SimpleGrid, SimpleGridProps, Stack, TextInput } from '@mantine/core';
import { useDebouncedState, useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { paginationSize } from '../src/static';
import { Asset } from '../src/types/assets';
import { Game } from '../src/types/games';
import { filter, paginate, sort } from '../src/utils/games';
import GameCard from './GameCard';

interface GameGridProps extends Omit<SimpleGridProps, 'cols' | 'spacing' | 'breakpoints'> {
  assets: Map<string, Partial<Asset>>;
  totalPages: number;
  games: Game[];
  page: number;
}

function Filters({
  page,
  games,
  setGames,
  setFiltered,
  initialGames,
}: {
  page: number;
  games: Game[];
  initialGames: Game[];
  setGames: (v: Game[]) => void;
  setFiltered: (v: boolean) => void;
}) {
  const [search, setSearch] = useDebouncedState('', 200);

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(undefined);
  const [sortBy, setSortBy] = useState<'name' | 'status' | 'updates'>(undefined);

  useEffect(() => {
    if (!search) {
      setGames(initialGames);
      setFiltered(false);
      return;
    }

    setFiltered(true);
    setGames(filter(search));
  }, [search]);

  useEffect(() => {
    if (sortBy === undefined) {
      return;
    }

    if (!search && sortBy === null) {
      setGames([...initialGames]);
      return;
    }

    if (search) {
      const sorted = sort(sortBy, sortOrder, games);
      setGames([...sorted]);
      return;
    }

    const sorted = sort(sortBy, sortOrder);
    const paginated = paginate(paginationSize, sorted);

    setGames([...paginated.at(page - 1)]);
  }, [page, sortBy, sortOrder]);

  return (
    <Group mb={10} noWrap>
      <TextInput
        description="Search"
        placeholder="Name, Status, ..."
        onChange={(value) => setSearch(value.currentTarget.value)}
      />
      <Select
        description="Sort By"
        placeholder="Nothing"
        clearable
        data={[
          { value: 'name', label: 'Name' },
          { value: 'status', label: 'Status' },
          { value: 'updates', label: 'Updates' },
        ]}
        value={sortBy}
        onChange={(value) => setSortBy(value as Parameters<typeof setSortBy>[0])}
      />
      <Select
        description="Sort Order"
        placeholder="Nothing"
        clearable
        data={[
          { value: 'asc', label: 'Ascending' },
          { value: 'desc', label: 'Descending' },
        ]}
        value={sortOrder}
        onChange={(value) => setSortOrder(value as Parameters<typeof setSortOrder>[0])}
      />
    </Group>
  );
}

export default function ({ page, games, totalPages, assets, ...props }: GameGridProps) {
  const breakpoint = useMediaQuery('(min-width: 1200px)') ?? true;
  const [filteredGames, setGames] = useState(games);
  const [filtered, setFiltered] = useState(false);
  const router = useRouter();

  return (
    <Stack align="center" mt={20} mb={20}>
      <Filters games={filteredGames} page={page} initialGames={games} setFiltered={setFiltered} setGames={setGames} />
      <SimpleGrid
        spacing="xl"
        cols={4}
        breakpoints={[
          { cols: 2, maxWidth: 1335 },
          { cols: 1, maxWidth: 715 },
        ]}
        {...props}
      >
        {filteredGames.map((game) => {
          const { slug } = game;
          return <GameCard key={slug} game={game} banner={assets.get(slug).banner} />;
        })}
      </SimpleGrid>
      {!filtered && (
        <Pagination
          radius="md"
          page={page}
          total={totalPages}
          size={breakpoint ? 'lg' : undefined}
          onChange={(value) => router.push(`/page/${value}`)}
        />
      )}
    </Stack>
  );
}
