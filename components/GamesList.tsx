import {
  ActionIcon,
  Anchor,
  Avatar,
  Center,
  DefaultProps,
  Group,
  Stack,
  Table,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import {
  IconChevronDown,
  IconChevronUp,
  IconExternalLink,
  IconNote,
  IconSearch,
  IconSelector,
} from '@tabler/icons';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import Game from '../types/game';
import { style } from '../utils/style';
import AntiCheatIcon from './AntiCheatIcon';
import Badges from './Badges';

interface ItemProps {
  game: Game;
  anticheatIcons: (string | null)[][];
}

function Item({ game, anticheatIcons }: ItemProps) {
  const { classes } = style();

  return (
    <tr>
      <td>
        <Group noWrap>
          <Avatar radius="xl" src={game.logo} />
          <Text>{game.name}</Text>
        </Group>
      </td>
      <td>
        <Badges showText game={game} />
      </td>
      <td>
        <Stack>
          {game.anticheats.map((anticheat) => (
            <div key={anticheat}>
              <div className={classes.smallHide}>
                <AntiCheatIcon showText anticheat={anticheat} anticheatIcons={anticheatIcons} />
              </div>
              <Tooltip withArrow label={anticheat} className={classes.largeShow}>
                <AntiCheatIcon
                  showText
                  key={anticheat}
                  anticheat={anticheat}
                  anticheatIcons={anticheatIcons}
                />
              </Tooltip>
            </div>
          ))}
        </Stack>
      </td>
      <td className={classes.mobileHide}>
        <Stack>
          {game.notes.map((note) =>
            note[1] ? (
              <Group key={note[1]} noWrap>
                <ActionIcon component="a" target="_blank" href={note[1]}>
                  <IconExternalLink />
                </ActionIcon>
                <Anchor target="_blank" href={note[1]}>
                  {note[0]}
                </Anchor>
              </Group>
            ) : (
              <Group key={note[0]} noWrap>
                <IconNote />
                <Text>{note[0]}</Text>
              </Group>
            )
          )}
        </Stack>
      </td>
    </tr>
  );
}

interface SearchBoxProps {
  setQuery: Dispatch<SetStateAction<string>>;
}

function SearchBox({ setQuery }: SearchBoxProps) {
  const [search, setSearch] = useState('');
  const [debounced] = useDebouncedValue(search, 500);

  useEffect(() => {
    setQuery(debounced);
  }, [debounced]);

  return (
    <Tooltip label="You can also search by Anti-Cheat or Supported-Status">
      <TextInput
        value={search}
        icon={<IconSearch />}
        variant="unstyled"
        placeholder="Search..."
        onChange={(event) => setSearch(event.target.value)}
      />
    </Tooltip>
  );
}

enum SortMode {
  normal,
  name_asc,
  name_desc,
  status_asc,
  status_desc,
}

interface ThButtonProps extends DefaultProps {
  text: string;
  type: 'name' | 'status' | 'none';

  sortMode?: SortMode;
  setSortMode?: Dispatch<SetStateAction<SortMode>>;
}

function ThButton({ text, type, sortMode, setSortMode, ...props }: ThButtonProps) {
  const Icon = (() => {
    if (type === 'name') {
      switch (sortMode) {
        case SortMode.name_asc:
          return IconChevronUp;
        case SortMode.name_desc:
          return IconChevronDown;
      }
    } else {
      switch (sortMode) {
        case SortMode.status_asc:
          return IconChevronUp;
        case SortMode.status_desc:
          return IconChevronDown;
      }
    }
    return IconSelector;
  })();

  return (
    <th {...props}>
      <UnstyledButton
        onClick={() => {
          if (type === 'name') {
            switch (sortMode) {
              case SortMode.normal:
                setSortMode!(SortMode.name_asc);
                break;
              case SortMode.name_asc:
                setSortMode!(SortMode.name_desc);
                break;
              case SortMode.name_desc:
                setSortMode!(SortMode.normal);
                break;
            }
          } else if (type === 'status') {
            switch (sortMode) {
              case SortMode.normal:
                setSortMode!(SortMode.status_asc);
                break;
              case SortMode.status_asc:
                setSortMode!(SortMode.status_desc);
                break;
              case SortMode.status_desc:
                setSortMode!(SortMode.normal);
                break;
            }
          }
        }}
      >
        <Group position="apart">
          <Text weight={500} size="sm">
            {text}
          </Text>
          {type !== 'none' ? (
            <Center>
              <Icon size={14} />
            </Center>
          ) : (
            <></>
          )}
        </Group>
      </UnstyledButton>
    </th>
  );
}

interface GamesListProps extends DefaultProps {
  games: Game[];
  anticheatIcons: (string | null)[][];
}

export default function GamesList({ games, anticheatIcons, ...props }: GamesListProps) {
  const { classes } = style();
  const [query, setQuery] = useState('');
  const [sortMode, setSortMode] = useState(SortMode.normal);

  const shownGames = useMemo(() => {
    const rtn = games.filter(
      (game) =>
        game.name.toLowerCase().includes(query.toLowerCase()) ||
        game.anticheats.find((anticheat) =>
          anticheat.toLowerCase().includes(query.toLowerCase())
        ) ||
        game.status.toLowerCase().includes(query.toLowerCase())
    );

    switch (sortMode) {
      case SortMode.name_asc:
        return rtn.sort((a, b) => a.name.localeCompare(b.name));
      case SortMode.name_desc:
        return rtn.sort((a, b) => b.name.localeCompare(a.name));
      case SortMode.status_asc:
        return rtn.sort((a, b) => a.status.localeCompare(b.status));
      case SortMode.status_desc:
        return rtn.sort((a, b) => b.status.localeCompare(a.status));
      default:
        return rtn;
    }
  }, [games, query, sortMode]);

  return (
    <>
      <Group position="apart" sx={{ marginTop: 15 }}>
        <SearchBox setQuery={setQuery} />
      </Group>
      <Table {...props} horizontalSpacing="xl" fontSize="md">
        <thead>
          <tr>
            <ThButton text="Name" type="name" sortMode={sortMode} setSortMode={setSortMode} />
            <ThButton text="Status" type="status" sortMode={sortMode} setSortMode={setSortMode} />
            <ThButton text="Anti-Cheat" type="none" />
            <ThButton className={classes.mobileHide} text="Notes" type="none" />
          </tr>
        </thead>
        <tbody>
          {shownGames.map((game) => (
            <Item key={game.name} game={game} anticheatIcons={anticheatIcons} />
          ))}
        </tbody>
      </Table>
    </>
  );
}
