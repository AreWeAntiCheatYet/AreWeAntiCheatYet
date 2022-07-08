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
  useMantineTheme,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import {
  IconBrandSteam,
  IconCalendarStats,
  IconChevronDown,
  IconChevronUp,
  IconExternalLink,
  IconNote,
  IconQuestionMark,
  IconSearch,
  IconSelector,
} from '@tabler/icons';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import Game, { GameStatus } from '../types/game';
import { style } from '../utils/style';
import AntiCheatIcon from './AntiCheatIcon';
import Badges from './Badges';

interface ItemProps {
  game: Game;
  highlight: boolean;
  showStores: boolean;
  anticheatIcons: (string | null)[][];
}

function Item({ game, highlight, showStores, anticheatIcons }: ItemProps) {
  const { classes } = style();
  const theme = useMantineTheme();

  const getColor = () => {
    switch (game.status) {
      case GameStatus.denied:
        return theme.colors.red[5];
      case GameStatus.broken:
        return theme.colors.orange[5];
      case GameStatus.supported:
        return theme.colors.green[5];
      case GameStatus.running:
        return theme.colors.cyan[5];
      case GameStatus.planned:
        return theme.colors.violet[5];
      default:
        return '';
    }
  };

  return (
    <tr style={highlight ? { backgroundColor: `${getColor()}55` } : undefined}>
      <td style={{ width: '30%' }}>
        <Group position="apart" noWrap>
          <Group noWrap>
            {game.logo ? (
              <Avatar radius="xl" src={game.logo} />
            ) : (
              <Avatar radius="xl">
                <IconQuestionMark />
              </Avatar>
            )}
            {game.url ? (
              <Anchor target="_blank" href={game.url} className={classes.mobileSmall}>
                {game.name}
              </Anchor>
            ) : (
              <Text className={classes.mobileSmall}>{game.name}</Text>
            )}
          </Group>
          {showStores && game.storeIds && (
            <Group align="center" className={classes.mobileHide}>
              {game.storeIds.epic && (
                <ActionIcon
                  radius="xl"
                  size="sm"
                  variant="filled"
                  color="indigo"
                  component="a"
                  target="_blank"
                  href={`https://store.epicgames.com/p/${game.storeIds.epic.slug}/`}
                >
                  <Image width="18" height="18" layout="fixed" src="/stores/epic-games.webp" />
                </ActionIcon>
              )}
              {game.storeIds.steam && (
                <ActionIcon
                  radius="xl"
                  size="sm"
                  variant="filled"
                  color="gray"
                  component="a"
                  target="_blank"
                  href={`https://store.steampowered.com/app/${game.storeIds.steam}/`}
                >
                  <IconBrandSteam />
                </ActionIcon>
              )}
            </Group>
          )}
        </Group>
      </td>
      <td style={{ width: '20%' }}>
        <Badges showText game={game} />
      </td>
      <td>
        <Stack>
          {game.anticheats.map((anticheat) => (
            <div key={anticheat}>
              <div className={classes.smallHide}>
                <AntiCheatIcon showText anticheat={anticheat} anticheatIcons={anticheatIcons} />
              </div>
              <Tooltip withArrow label={anticheat} className={classes.largeHide}>
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
  status_since,
  notes_asc,
  notes_desc,
}

interface ThButtonProps extends DefaultProps {
  text: string;
  type: 'name' | 'status' | 'notes' | 'none';

  sortMode?: SortMode;
  setSortMode?: Dispatch<SetStateAction<SortMode>>;
}

function ThButton({ text, type, sortMode, setSortMode, ...props }: ThButtonProps) {
  const Icon = (() => {
    switch (type) {
      case 'name':
        switch (sortMode) {
          case SortMode.name_asc:
            return IconChevronUp;
          case SortMode.name_desc:
            return IconChevronDown;
        }
        break;
      case 'status':
        switch (sortMode) {
          case SortMode.status_asc:
            return IconChevronUp;
          case SortMode.status_desc:
            return IconChevronDown;
          case SortMode.status_since:
            return IconCalendarStats;
        }
        break;
      case 'notes':
        switch (sortMode) {
          case SortMode.notes_asc:
            return IconChevronUp;
          case SortMode.notes_desc:
            return IconChevronDown;
        }
        break;
    }

    return IconSelector;
  })();

  return (
    <th {...props}>
      <UnstyledButton
        onClick={() => {
          if (type === 'name') {
            switch (sortMode) {
              case SortMode.name_desc:
                setSortMode!(SortMode.name_asc);
                break;
              case SortMode.name_asc:
                setSortMode!(SortMode.normal);
                break;
              default:
                setSortMode!(SortMode.name_desc);
                break;
            }
          } else if (type === 'status') {
            switch (sortMode) {
              case SortMode.status_desc:
                setSortMode!(SortMode.status_asc);
                break;
              case SortMode.status_asc:
                setSortMode!(SortMode.status_since);
                break;
              case SortMode.status_since:
                setSortMode!(SortMode.normal);
                break;
              default:
                setSortMode!(SortMode.status_desc);
                break;
            }
          } else if (type === 'notes') {
            switch (sortMode) {
              case SortMode.notes_desc:
                setSortMode!(SortMode.notes_asc);
                break;
              case SortMode.notes_asc:
                setSortMode!(SortMode.normal);
                break;
              default:
                setSortMode!(SortMode.notes_desc);
                break;
            }
          }
        }}
        sx={{ cursor: type !== 'none' ? 'pointer' : 'default' }}
      >
        <Group position="apart" noWrap>
          <Text weight={600} size="sm">
            {text}
          </Text>
          {type !== 'none' && (
            <Center>
              <Icon size={14} />
            </Center>
          )}
        </Group>
      </UnstyledButton>
    </th>
  );
}

interface GamesListProps extends DefaultProps {
  games: Game[];
  highlight: boolean;
  showStores: boolean;
  anticheatIcons: (string | null)[][];
}

export default function GamesList({
  games,
  highlight,
  showStores,
  anticheatIcons,
  ...props
}: GamesListProps) {
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
        return rtn.sort((a, b) => (b.native ? 1 : b.status.localeCompare(a.status)));
      case SortMode.status_since:
        return rtn.sort((a, b) =>
          a.updates.length > 0 && b.updates.length > 0
            ? new Date(b.updates.at(-1)!.date).getTime() -
              new Date(a.updates.at(-1)!.date).getTime()
            : b.updates.length - a.updates.length
        );
      case SortMode.notes_asc:
        return rtn.sort((a, b) => a.notes.length - b.notes.length);
      case SortMode.notes_desc:
        return rtn.sort((a, b) => b.notes.length - a.notes.length);
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
            <ThButton
              className={classes.mobileHide}
              text="Notes"
              type="notes"
              sortMode={sortMode}
              setSortMode={setSortMode}
            />
          </tr>
        </thead>
        <tbody>
          {shownGames.map((game) => (
            <Item
              game={game}
              key={game.name}
              highlight={highlight}
              showStores={showStores}
              anticheatIcons={anticheatIcons}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
}
