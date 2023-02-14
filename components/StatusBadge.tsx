import { Card, CardProps, Group, SpacingValue, SystemProp, Text } from '@mantine/core';
import { Game } from '../src/types/games';
import { getStyle } from '../src/utils/games';

interface StatusBadgeProps extends Omit<CardProps, 'bg' | 'children'> {
  fz?: SystemProp<SpacingValue>;
  weight?: number;
  size?: number;
  game: Game;
}

export default function ({ game, radius, size, fz, weight, ...props }: StatusBadgeProps) {
  const status = getStyle(game.status);

  return (
    <Card bg={status.color} radius={radius || 'xl'} {...props}>
      <Group noWrap sx={{ height: '100%' }} position="center" align="center">
        <status.icon color="white" size={size} />
        <Text fz={fz} weight={weight} color="white" align="center">
          {game.status}
        </Text>
      </Group>
    </Card>
  );
}
