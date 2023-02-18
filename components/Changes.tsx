import { Group, Table, Text } from '@mantine/core';
import { IconCirclePlus, IconX } from '@tabler/icons-react';
import { Change, Game } from '../src/types/games';
import AntiCheatBadge from './AntiCheatBadge';
import Notes from './Notes';
import Reference from './Reference';
import StatusBadge from './StatusBadge';
import Updates from './Updates';

interface ChangesProps {
  change: Change;
  withCaption?: boolean;
}

export default function ({ change, withCaption }: ChangesProps) {
  const { old, recent, changedProperties } = change;

  if (!old) {
    return (
      <Group noWrap spacing={5} align="center">
        <IconCirclePlus />
        <Text>Newly added!</Text>
      </Group>
    );
  }

  const head = (
    <tr>
      <th>Last State</th>
      <th>Recent Changes</th>
    </tr>
  );

  const body = changedProperties.map((property) => {
    const component = (game: Game) => {
      switch (property) {
        case 'anticheats':
          return (
            <Group noWrap>
              {game.anticheats.map((anticheat) => (
                <AntiCheatBadge key={anticheat} anticheat={anticheat} height={32} />
              ))}
            </Group>
          );
        case 'notes':
          return game.notes.length > 0 ? <Notes size="sm" fz="xs" game={game} /> : <IconX />;
        case 'status':
          return <StatusBadge variant="text" size={16} game={game} />;
        case 'updates':
          return game.updates.length > 0 ? <Updates fz="xs" fzBody="xs" fzTitle="xs" game={game} /> : <IconX />;
        case 'reference':
          return game.reference ? <Reference game={game} fz={'xs'} /> : <IconX />;
        case 'native':
          return <Text fz="xs">{game[property] ? 'Native' : 'Not Native'}</Text>;
      }
    };

    return (
      <tr key={property}>
        <td>{component(old)}</td>
        <td>{component(recent)}</td>
      </tr>
    );
  });

  return (
    <Table withBorder withColumnBorders>
      {(withCaption ?? true) && <caption>Game Changes</caption>}
      <thead>{head}</thead>
      <tbody>{body}</tbody>
    </Table>
  );
}
