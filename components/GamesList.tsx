import {
  ActionIcon,
  Anchor,
  Avatar,
  DefaultProps,
  Group,
  Stack,
  Table,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconExternalLink, IconNote, IconSearch } from '@tabler/icons';
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

interface GamesListProps extends DefaultProps {
  games: Game[];
  anticheatIcons: (string | null)[][];
}

export default function GamesList({ games, anticheatIcons, ...props }: GamesListProps) {
  const { classes } = style();
  const [query, setQuery] = useState('');

  const shownGames = useMemo(
    () =>
      games.filter(
        (game) =>
          game.name.toLowerCase().includes(query.toLowerCase()) ||
          game.anticheats.find((anticheat) =>
            anticheat.toLowerCase().includes(query.toLowerCase())
          ) ||
          game.status.toLowerCase().includes(query.toLowerCase())
      ),
    [games, query]
  );

  return (
    <>
      <Group position="center" sx={{ marginTop: 15 }}>
        <SearchBox setQuery={setQuery} />
      </Group>
      <Table {...props} horizontalSpacing="xl" fontSize="md">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Anti-Cheat</th>
            <th className={classes.mobileHide}>Notes</th>
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
