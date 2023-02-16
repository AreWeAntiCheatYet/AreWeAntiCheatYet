import {
  ActionIcon,
  Avatar,
  Group,
  ScrollArea,
  Stack,
  StackProps,
  Table,
  Text,
  ThemeIcon,
  useMantineTheme,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { IconCalendarEvent, IconExternalLink, IconQuestionMark } from '@tabler/icons-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../src/app/state';
import { Asset } from '../src/types/assets';
import { Game } from '../src/types/games';
import { getStyle } from '../src/utils/games';
import AntiCheatBadge from './AntiCheatBadge';
import Filters from './Filters';
import Notes from './Notes';
import StatusBadge from './StatusBadge';

function GameUpdate({ game }: { game: Game }) {
  const updatesSorted = game.updates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const mostRecentUpdate = updatesSorted[0];

  const [update, setUpdate] = useState(mostRecentUpdate?.date);

  useEffect(() => {
    dayjs.extend(relativeTime);
    setUpdate(dayjs(mostRecentUpdate?.date).fromNow());
  }, []);

  if (mostRecentUpdate) {
    return (
      <Group noWrap>
        <ThemeIcon color="green" radius="xl">
          <IconCalendarEvent size={16} />
        </ThemeIcon>
        <Text variant="link" component="a" target="_blank" href={`/game/${game.slug}`}>
          {update}
        </Text>
      </Group>
    );
  }

  return;
}

interface GameTableProps extends Omit<StackProps, 'align'> {
  assets: Map<string, Partial<Asset>>;
  games: Game[];
}

export default function ({ assets, games, ...props }: GameTableProps) {
  const [filteredGames, setGames] = useState([...games]);
  const { rowHighlight } = useContext(SettingsContext);
  const { width } = useViewportSize();
  const theme = useMantineTheme();

  const body = filteredGames.map((game) => {
    const { name, slug, url, status } = game;
    const { logo } = assets.get(slug);
    const style = getStyle(status);

    const highlightColor = theme.fn.rgba(theme.fn.themeColor(style.color, 8), 0.2);

    return (
      <tr key={name} style={rowHighlight ? { backgroundColor: highlightColor } : undefined}>
        <td>
          <Group noWrap>
            {logo ? (
              <Avatar src={logo} radius="md" w={16} />
            ) : (
              <ThemeIcon color="gray" size={25}>
                <IconQuestionMark size={16} />
              </ThemeIcon>
            )}
            <Text variant={url ? 'link' : undefined} component={url ? 'a' : undefined} target="_blank" href={url}>
              {name}
            </Text>
          </Group>
        </td>
        <td>
          <StatusBadge variant="text" size={16} game={game} />
        </td>
        <td>
          <Group noWrap>
            {game.anticheats.map((anticheat) => (
              <AntiCheatBadge key={anticheat} anticheat={anticheat} height={25} />
            ))}
          </Group>
        </td>
        <td style={{ padding: '10px' }}>
          {game.notes.length > 0 ? <Notes iconSize={16} size="md" fz="sm" game={game} /> : <></>}
        </td>
        <td>
          <GameUpdate game={game} />
        </td>
        <td>
          <ActionIcon variant="transparent" component="a" target="_blank" href={`/game/${game.slug}`}>
            <IconExternalLink />
          </ActionIcon>
        </td>
      </tr>
    );
  });

  return (
    <Stack align="center" {...props}>
      <Group position="center">
        <Filters
          games={filteredGames}
          setFiltered={() => {
            /*unused*/
          }}
          initialGames={games}
          setGames={setGames}
        />
      </Group>
      <ScrollArea type="never" w={width * 0.8 || undefined} sx={width ? undefined : { width: '100%' }}>
        <Table withBorder withColumnBorders striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Anti-Cheats</th>
              <th>Notes</th>
              <th>Recorded Updates</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>{body}</tbody>
        </Table>
      </ScrollArea>
    </Stack>
  );
}
