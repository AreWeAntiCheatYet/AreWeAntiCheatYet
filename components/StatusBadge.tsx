import { Card, CardProps, Group, SpacingValue, SystemProp, Text, ThemeIcon } from '@mantine/core';
import { Game } from '../src/types/games';
import { getStyle } from '../src/utils/games';

interface StatusBadgeProps extends Omit<CardProps, 'bg' | 'children'> {
  fz?: SystemProp<SpacingValue>;
  variant?: 'badge' | 'text';
  weight?: number;
  size?: number;
  game: Game;
}

export default function ({ game, variant, radius, size, fz, weight, ...props }: StatusBadgeProps) {
  const status = getStyle(game.status);
  const { reference } = game;

  if (variant === 'text') {
    return (
      <Group noWrap {...props}>
        <ThemeIcon radius="xl" color={status.color}>
          <status.icon size={size} />
        </ThemeIcon>
        <Text
          fz={fz}
          lineClamp={1}
          align="center"
          weight={weight}
          target="_blank"
          href={reference}
          component={reference ? 'a' : undefined}
          color={reference ? undefined : 'white'}
          variant={reference ? 'link' : undefined}
        >
          {game.status}
        </Text>
      </Group>
    );
  }

  return (
    <Card bg={status.color} radius={radius || 'xl'} {...props}>
      <Group noWrap sx={{ height: '100%' }} position="center" align="center">
        <status.icon color="white" size={size} />
        <Text fz={fz} weight={weight} color="white" align="center" lineClamp={1}>
          {game.status}
        </Text>
      </Group>
    </Card>
  );
}
