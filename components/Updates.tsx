import { Card, CardProps, Group, Text, Timeline, TimelineProps } from '@mantine/core';
import { IconHourglassEmpty } from '@tabler/icons-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';
import { Game } from '../src/types/games';

interface UpdateProps extends Omit<TimelineProps, 'active' | 'children'> {
  game: Game;
}

export default function ({ game, ...props }: UpdateProps) {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    dayjs.extend(relativeTime);
    setUpdates(game.updates.map((update) => dayjs(update.date).fromNow()));
  }, []);

  if (game.updates.length <= 0) {
    return (
      <Card {...(props as CardProps)} withBorder>
        <Group noWrap align="center">
          <IconHourglassEmpty />
          <Text color="dimmed" italic>
            No Updates available at this time
          </Text>
        </Group>
      </Card>
    );
  }

  return (
    <Timeline {...props} active={0}>
      {game.updates.map((update, index) => (
        <Timeline.Item key={update.name} fz="xl" title={update.name} lineVariant={index > 0 ? 'dotted' : 'dashed'}>
          <Text fz="md" color="dimmed">
            {updates[index]}
          </Text>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}
