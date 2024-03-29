import {
  Card,
  CardProps,
  Group,
  List,
  ListProps,
  MantineNumberSize,
  SpacingValue,
  SystemProp,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { IconHourglassEmpty, IconNote } from '@tabler/icons-react';
import { Game } from '../src/types/games';

interface NotesProps extends Omit<ListProps, 'spacing' | 'children'> {
  game: Game;
  iconSize?: number;
  lineClamp?: number;
  size?: MantineNumberSize;
  fz?: SystemProp<SpacingValue>;
}

export default function ({ game, iconSize, lineClamp, size, fz, ...props }: NotesProps) {
  if (game.notes.length <= 0) {
    return (
      <Card {...(props as CardProps)} withBorder>
        <Group noWrap align="center">
          <IconHourglassEmpty size={iconSize} />
          <Text fz={fz} color="dimmed" italic>
            No Notes available at this time
          </Text>
        </Group>
      </Card>
    );
  }

  return (
    <List
      spacing="md"
      icon={
        <ThemeIcon size={size ?? 'lg'} radius="xl" color="gray">
          <IconNote size={iconSize} />
        </ThemeIcon>
      }
      {...props}
    >
      {game.notes.map((note) => {
        const text = note[0];
        const reference = note[1];

        return (
          <List.Item key={text}>
            <Text
              fz={fz || 'xl'}
              lineClamp={lineClamp}
              component={reference ? 'a' : undefined}
              variant={reference ? 'link' : undefined}
              {...(reference ? { href: reference, target: '_blank' } : undefined)}
            >
              {text}
            </Text>
          </List.Item>
        );
      })}
    </List>
  );
}
