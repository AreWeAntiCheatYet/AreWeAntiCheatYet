import {
  ActionIcon,
  Box,
  Center,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconAward, IconQuestionMark, IconWorld } from '@tabler/icons-react';
import { InferGetStaticPropsType } from 'next';
import { CSSProperties } from 'react';
import AntiCheatBadge from '../../components/AntiCheatBadge';
import Notes from '../../components/Notes';
import Reference from '../../components/Reference';
import StatusBadge from '../../components/StatusBadge';
import StoreBadges from '../../components/StoreBadges';
import Updates from '../../components/Updates';
import assets from '../../src/assets';
import { Games } from '../../src/static';

export const getStaticProps = async ({ params: { id } }) => {
  const game = Games.find((x) => x.slug === id || x.storeIds.steam === id);
  const asset = await assets(game);

  return { props: { game, id, banner: asset.banner || null } };
};

export const getStaticPaths = async () => {
  const paths = Games.map((game) => ({ params: { id: game.slug } }));

  for (const game of Games) {
    if (game.storeIds.steam) {
      paths.push({ params: { id: game.storeIds.steam } });
    }
  }

  return { paths, fallback: false };
};

export default function ({ banner, game }: InferGetStaticPropsType<typeof getStaticProps>) {
  const breakpoint = useMediaQuery('(min-width: 1200px)') ?? true;
  const theme = useMantineTheme();

  const background = banner ? theme.colors.dark[6] : 'gray';

  const style: CSSProperties = {
    backgroundSize: 'cover',
    position: 'absolute',
    height: `100%`,
    width: `inherit`,
    zIndex: -1,
  };

  return (
    <Grid columns={breakpoint ? 3 : 1} m={0} sx={{ height: '100%' }}>
      <Grid.Col span={1} p={0}>
        <Box sx={{ position: 'relative', overflow: 'hidden', height: '100%', width: '100%' }}>
          <Box bg={background} style={{ ...style }} />
          <Box
            style={{
              backgroundImage: `url('${banner}')`,
              filter: 'blur(50px)',
              opacity: 0.5,
              ...style,
            }}
          />
          <Center mt={80}>
            <Stack align="center">
              <Paper radius="xl" shadow="xl" sx={{ overflow: 'hidden' }}>
                {banner ? (
                  <img src={banner} style={{ objectFit: 'cover' }} alt="Banner" width={220} height={310} />
                ) : (
                  <Center bg="gray" w={220} h={310}>
                    <IconQuestionMark size={32} />
                  </Center>
                )}
              </Paper>
              <Title mt={15} color="white" align="center">
                {game.name}
              </Title>
              {game.url && (
                <ActionIcon variant="transparent" component="a" href={game.url} target="_blank">
                  <IconWorld color="white" size={64} />
                </ActionIcon>
              )}
              <StatusBadge mt={20} shadow="lg" fz={20} weight={700} size={32} game={game} />
              {game.native && (
                <Group mt={15}>
                  <Tooltip label="Native">
                    <IconAward size={48} />
                  </Tooltip>
                </Group>
              )}
              {game.anticheats.length > 0 && (
                <>
                  <Text mt={20} fz="md" color="dimmed">
                    AntiCheat
                  </Text>
                  <Group noWrap mb={20}>
                    {game.anticheats.map((anticheat) => (
                      <AntiCheatBadge key={anticheat} anticheat={anticheat} height={64} />
                    ))}
                  </Group>
                </>
              )}
              {Object.entries(game.storeIds).length > 0 && (
                <>
                  <Text mt={20} fz="md" color="dimmed">
                    Available on
                  </Text>
                  <StoreBadges game={game} height={64} mb={20} />
                </>
              )}
            </Stack>
          </Center>
        </Box>
      </Grid.Col>
      <Grid.Col mt={25} span={breakpoint ? 2 : 1}>
        <Grid columns={breakpoint ? 2 : 1} sx={{ height: '100%' }}>
          <Grid.Col p={50} span={1}>
            <Title>Updates</Title>
            <Updates mt={55} game={game} />
          </Grid.Col>
          <Grid.Col p={50} span={1}>
            <Title>Notes</Title>
            <Notes mt={50} game={game} />
          </Grid.Col>
          <Grid.Col p={50} offset={breakpoint ? 1 : 0} span={1}>
            <Title>Reference</Title>
            <Reference mt={55} game={game} />
          </Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>
  );
}
