import {
  ActionIcon,
  Anchor,
  Avatar,
  DefaultProps,
  Group,
  Input,
  Stack,
  Table,
  Text,
  Tooltip,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconExternalLink, IconSearch } from '@tabler/icons';
import { useState } from 'react';
import Game from '../types/game';
import { style } from '../utils/style';
import AntiCheatBadge from './AntiCheatIcon';
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
              <div className={classes.mobileHide}>
                <AntiCheatBadge showText anticheat={anticheat} anticheatIcons={anticheatIcons} />
              </div>
              <Tooltip withArrow label={anticheat} className={classes.mobileShow}>
                <AntiCheatBadge
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
          {game.notes.map((note) => (
            <Group key={note[1]}>
              <ActionIcon component="a" target="_blank" href={note[1]}>
                <IconExternalLink />
              </ActionIcon>
              <Anchor target="_blank" href={note[1]}>
                {note[0]}
              </Anchor>
            </Group>
          ))}
        </Stack>
      </td>
    </tr>
  );
}

interface GamesListProps extends DefaultProps {
  games: Game[];
  anticheatIcons: (string | null)[][];
}

export default function GamesList({ games, anticheatIcons, ...props }: GamesListProps) {
  const { classes } = style();
  const [search, setSearch] = useState('');
  const [debounced] = useDebouncedValue(search, 200);

  return (
    <>
      <Group position="center" sx={{ marginTop: 15 }}>
        <Tooltip label="You can also search by Anti-Cheat or Supported-Status">
          <Input
            icon={<IconSearch />}
            variant="unstyled"
            placeholder="Search..."
            onChange={(event: any) => setSearch(event.target.value)}
          />
        </Tooltip>
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
          {games
            .filter(
              (game) =>
                game.name.toLowerCase().includes(debounced.toLowerCase()) ||
                game.anticheats.find((anticheat) =>
                  anticheat.toLowerCase().includes(debounced.toLowerCase())
                ) ||
                game.status.toLowerCase().includes(debounced.toLowerCase())
            )
            .map((game) => (
              <Item key={game.name} game={game} anticheatIcons={anticheatIcons} />
            ))}
        </tbody>
      </Table>
    </>
  );
}
