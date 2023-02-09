import {
  Box,
  Card,
  Center,
  Grid,
  Group,
  List,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Timeline,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconNote } from '@tabler/icons-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Games from '../../games.json';
import { Game } from '../../src/types/games';
import { getLogo, getStyle } from '../../src/utils/games';

// TODO: we should accept both a store-id, as well as some other identifier here.
// TODO: Empty notes, split up code...
// TODO: Show reference and stores...

export const getStaticProps = async ({ params: { id } }) => {
  const game = Games.at(id) as Game;
  const updates = game.updates.reverse();

  return { props: { game, id, updates } };
};

export const getStaticPaths = async () => {
  const paths = Games.map((_value, index) => ({ params: { id: index.toString() } }));
  return { paths, fallback: false };
};

export default function ({ id, game }: InferGetStaticPropsType<typeof getStaticProps>) {
  const breakpoint = useMediaQuery('(min-width: 1200px)') ?? true;
  const theme = useMantineTheme();

  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    dayjs.extend(relativeTime);
    setUpdates(game.updates.map((update) => dayjs(update.date).fromNow()));
  }, []);

  const background = theme.colorScheme === 'dark' ? undefined : theme.colors.gray[5];
  const banner = `/assets/banner-${id}.png`;
  const status = getStyle(game.status);

  return (
    <Grid columns={breakpoint ? 4 : 1} m={0} sx={{ height: '100%' }}>
      <Grid.Col span={1} p={0}>
        <Box sx={{ position: 'relative', overflow: 'hidden', height: '100%', width: '100%' }}>
          <Box
            bg={background}
            style={{
              backgroundImage: `url('${banner}')`,
              backgroundSize: 'cover',
              position: 'absolute',
              filter: 'blur(50px)',
              height: `100%`,
              width: `inherit`,
              opacity: 0.5,
              zIndex: -1,
            }}
          />
          <Center mt={150}>
            <Stack align="center">
              <Paper radius="xl" sx={{ overflow: 'hidden' }}>
                <Image src={banner} alt="Banner" width={220} height={310} />
              </Paper>
              <Title align="center" mt={15}>
                {game.name}
              </Title>
              <Card mt={20} bg={status.color} radius="xl">
                <Group noWrap>
                  <status.icon size={32} />
                  <Text fz={20} weight={700} align="center">
                    {game.status}
                  </Text>
                </Group>
              </Card>
              <Group noWrap mt={20} mb={20}>
                {game.anticheats.map((anticheat) => (
                  <Tooltip
                    key={anticheat}
                    label={anticheat}
                    transition="slide-up"
                    events={{ hover: true, touch: true, focus: true }}
                  >
                    <img src={getLogo(anticheat)} alt={anticheat} height={64} />
                  </Tooltip>
                ))}
              </Group>
            </Stack>
          </Center>
        </Box>
      </Grid.Col>
      <Grid.Col ml={50} mt={25} span={1}>
        <Title>Updates</Title>
        <Timeline mt={50} active={0}>
          {game.updates.map((update, index) => (
            <Timeline.Item key={update.name} fz="xl" title={update.name} lineVariant={index > 0 ? 'dotted' : 'dashed'}>
              <Text fz="md" color="dimmed">
                {updates[index]}
              </Text>
            </Timeline.Item>
          ))}
        </Timeline>
      </Grid.Col>
      <Grid.Col span={1} ml={50} mt={25} mb={20}>
        <Title>Notes</Title>
        <List
          mt={50}
          spacing="md"
          icon={
            <ThemeIcon radius="xl" color="gray">
              <Center>
                <IconNote size={18} />
              </Center>
            </ThemeIcon>
          }
        >
          {game.notes.map((note) => (
            <List.Item key={note[0]}>
              <Text
                fz="xl"
                component={note[1] ? 'a' : undefined}
                variant={note[1] ? 'link' : undefined}
                {...(note[1] ? { href: note[1], target: '_blank' } : undefined)}
              >
                {note[0]}
              </Text>
            </List.Item>
          ))}
        </List>
      </Grid.Col>
    </Grid>
  );
}
