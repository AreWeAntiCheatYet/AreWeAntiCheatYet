import {
  Box,
  Button,
  Card,
  CardProps,
  Group,
  Stack,
  ThemeIcon,
  Title,
  Transition,
  useMantineTheme,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconBellRinging } from '@tabler/icons-react';
import Link from 'next/link';
import { CSSProperties } from 'react';
import { Game } from '../src/types/games';
import { getStyle } from '../src/utils/games';

interface GameCardProps extends Omit<CardProps, 'withBorder' | 'children' | 'bg'> {
  game: Game;
  banner: string;
  withNotification?: boolean;
}

export default function ({ w, h, game, banner, withNotification, ...props }: GameCardProps) {
  const { hovered, ref } = useHover();
  const theme = useMantineTheme();

  const background = theme.colorScheme === 'dark' ? undefined : theme.colors.gray[5];
  const status = getStyle(game.status);

  const style: CSSProperties = {
    position: 'absolute',
    height: `100%`,
    width: `100%`,
    zIndex: -1,
    left: 0,
    top: 0,
  };

  return (
    <Card withBorder w={w || 300} h={h || 400} bg={background} sx={{ zIndex: 0 }} p={0} ref={ref} {...props}>
      <Box
        style={{
          backgroundImage: `url('${banner}')`,
          backgroundSize: 'cover',
          filter: 'blur(5px)',
          opacity: 0.3,
          ...style,
        }}
      />
      <Box
        style={{
          mask: 'linear-gradient(transparent, black 100%)',
          background: status.mask || status.color,
          backdropFilter: 'blur(10px)',
          opacity: 0.2,
          ...style,
        }}
      />
      {withNotification && (
        <Group
          my={15}
          mx={-15}
          position="right"
          sx={{ width: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }}
        >
          <IconBellRinging />
        </Group>
      )}
      <Stack align="center" mt={150}>
        <ThemeIcon color={status.color} size={50} radius="xl">
          <status.icon />
        </ThemeIcon>
        <Title w={150} order={4} color="white" align="center">
          {game.name}
        </Title>
      </Stack>
      <Transition transition={'fade'} mounted={hovered}>
        {(styles) => (
          <div style={{ position: 'absolute', bottom: '50px', width: `${w || 300}px` }}>
            <Stack justify="flex-end" align="center" style={styles}>
              <Button component={Link} href={`/game/${game.slug}`} color={status.color} variant="light">
                See more
              </Button>
            </Stack>
          </div>
        )}
      </Transition>
    </Card>
  );
}
