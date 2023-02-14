import { Group, List, Stack, Title, useMantineTheme } from '@mantine/core';
import { IconHeartHandshake } from '@tabler/icons-react';

export default function () {
  const theme = useMantineTheme();

  return (
    <Stack>
      <Group noWrap spacing={5} align="center">
        <IconHeartHandshake color={theme.colors.red[8]} />
        <Title order={5}>Huge thanks to</Title>
      </Group>
      <List>
        <List.Item>
          Creator & Maintainer:{' '}
          <a href="https://github.com/Starz0r" target="_blank" rel="noreferrer">
            Starz0r
          </a>
        </List.Item>
        <List.Item>
          Re-Design & Maintainer:{' '}
          <a href="https://github.com/Curve" target="_blank" rel="noreferrer">
            Curve
          </a>
        </List.Item>
        <List.Item>
          All Banners and Logos:{' '}
          <a href="https://www.steamgriddb.com/" target="_blank" rel="noreferrer">
            SteamGridDB
          </a>
        </List.Item>
        <List.Item>
          Game-Information and Updates:{' '}
          <a href="https://github.com/Starz0r/AreWeAntiCheatYet/issues" target="_blank" rel="noreferrer">
            The Community
          </a>
        </List.Item>
      </List>
    </Stack>
  );
}
