import { Card, CardProps, Group, SpacingValue, SystemProp, Text, Timeline, TimelineProps } from '@mantine/core';
import { IconExternalLink, IconHourglassEmpty } from '@tabler/icons-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';
import { Game } from '../src/types/games';

interface UpdateProps extends Omit<TimelineProps, 'active' | 'children'> {
  game: Game;
  fz?: SystemProp<SpacingValue>;
  fzBody?: SystemProp<SpacingValue>;
  fzTitle?: SystemProp<SpacingValue>;
}

export default function ({ game, fz, fzBody, fzTitle, ...props }: UpdateProps) {
  const [updates, setUpdates] = useState(game.updates.map((x) => x.date));
  const gameUpdates = game.updates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  useEffect(() => {
    dayjs.extend(relativeTime);
    setUpdates(game.updates.map((update) => dayjs(update.date).fromNow()));
  }, []);

  if (game.updates.length <= 0) {
    return (
      <Card {...(props as CardProps)} withBorder>
        <Group noWrap align="center">
          <IconHourglassEmpty />
          <Text color="dimmed" italic fz={fz}>
            No Updates available at this time
          </Text>
        </Group>
      </Card>
    );
  }

  return (
    <Timeline {...props} active={0}>
      {gameUpdates.map((update, index) => {
        const { reference } = update;

        return (
          <Timeline.Item
            key={update.name}
            title={update.name}
            fz={fzTitle ?? 'xl'}
            lineVariant={index > 0 ? 'dotted' : 'dashed'}
          >
            {reference && (
              <Text variant="link" component="a" href={reference} fz={fz} target="_blank">
                <IconExternalLink style={{ marginRight: '5px' }} size={16} />
                Reference
              </Text>
            )}
            <Text fz={fzBody ?? 'md'} color="dimmed" suppressHydrationWarning>
              {updates[index]}
            </Text>
          </Timeline.Item>
        );
      })}
    </Timeline>
  );
}
