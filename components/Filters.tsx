import { Select, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { paginationSize } from '../src/static';
import { Game } from '../src/types/games';
import { filter, paginate, sort } from '../src/utils/games';

interface FilterProps {
  setFiltered: (v: boolean) => void;
  setGames: (v: Game[]) => void;

  initialGames: Game[];
  ignore?: boolean;
  games: Game[];
  page?: number;
}

export default function ({ page, games, ignore, setGames, setFiltered, initialGames }: FilterProps) {
  const router = useRouter();

  const [rawSearch, setSearch] = useState('');
  const [search] = useDebouncedValue(rawSearch, 200);

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(undefined);
  const [sortBy, setSortBy] = useState<'name' | 'status' | 'updates'>(undefined);

  useEffect(() => {
    if (ignore) {
      return;
    }

    if (!Object.entries(router.query).find((x) => x[1])) {
      if (!search && !sortOrder && !sortBy) {
        return;
      }
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
    setFiltered(!!search);

    if ((!search && !sortBy) || ignore) {
      setGames([...initialGames]);
      return;
    }

    let rtn: Game[] = games;

    if (search) {
      rtn = filter(search);
    }

    if (sortBy) {
      rtn = sort(sortBy, sortOrder, search ? rtn : undefined);
    }

    if (page && !search) {
      const paginated = paginate(paginationSize, rtn);
      rtn = paginated.at(page - 1);
    }

    setGames([...rtn]);
  }, [search, page, sortBy, sortOrder]);

  useEffect(() => {
    const { searchParams } = new URL(window.location.href);

    if ([...searchParams.entries()].length <= 0 || ignore) {
      return;
    }

    if (searchParams.has('search')) {
      setSearch(searchParams.get('search'));
    }

    if (searchParams.has('sortBy')) {
      setSortBy(searchParams.get('sortBy') as typeof sortBy);
    }

    if (searchParams.has('sortOrder')) {
      setSortOrder(searchParams.get('sortOrder') as typeof sortOrder);
    }
  }, []);

  return (
    <>
      <TextInput
        w={250}
        value={rawSearch}
        description="Search"
        placeholder="Name, Status, ..."
        onChange={(value) => setSearch(value.currentTarget.value)}
      />
      <Select
        w={250}
        clearable
        description="Sort By"
        placeholder="Nothing"
        data={[
          { value: 'name', label: 'Name' },
          { value: 'status', label: 'Status' },
          { value: 'updates', label: 'Updates' },
        ]}
        value={sortBy}
        onChange={(value) => setSortBy(value as Parameters<typeof setSortBy>[0])}
      />
      <Select
        w={250}
        disabled={!sortBy}
        placeholder="Nothing"
        description="Sort Order"
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
