import { Select, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { paginationSize } from '../src/static';
import { Game } from '../src/types/games';
import { filter, paginate, sort } from '../src/utils/games';

export default function ({
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
  const router = useRouter();

  const [rawSearch, setSearch] = useState('');
  const [search] = useDebouncedValue(rawSearch, 200);

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(undefined);
  const [sortBy, setSortBy] = useState<'name' | 'status' | 'updates'>(undefined);

  useEffect(() => {
    const { searchParams } = new URL(window.location.href);

    if ([...searchParams.entries()].length <= 0) {
      return;
    }

    setSearch(searchParams.get('search'));
    setSortBy(searchParams.get('sortBy') as typeof sortBy);
    setSortOrder(searchParams.get('sortOrder') as typeof sortOrder);
  }, []);

  useEffect(() => {
    const { searchParams } = new URL(window.location.href);

    if ([...searchParams.entries()].length <= 0 && !search && !sortOrder && !sortBy) {
      return;
    }

    router.replace(
      {
        query: { ...router.query, search, sortOrder, sortBy },
      },
      undefined,
      { scroll: false },
    );
  }, [page, search, sortOrder, sortBy]);

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
    if (!search && !sortBy) {
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
    <>
      <TextInput
        value={rawSearch}
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
        disabled={!sortBy}
        clearable
        data={[
          { value: 'asc', label: 'Ascending' },
          { value: 'desc', label: 'Descending' },
        ]}
        value={sortOrder}
        onChange={(value) => setSortOrder(value as Parameters<typeof setSortOrder>[0])}
      />
    </>
  );
}
