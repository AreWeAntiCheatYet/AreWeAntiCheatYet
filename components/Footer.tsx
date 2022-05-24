import { Anchor, Group, Stack } from '@mantine/core';
import { IconHeartHandshake } from '@tabler/icons';

interface AppFooterProps {
  lastBuildTime: number;
}

export default function AppFooter({ lastBuildTime }: AppFooterProps) {
  return (
    <Stack sx={{ marginTop: 15, height: '100%' }}>
      <Group position="center">
        Don’t see a game you’re interested in on here yet?
        <Anchor
          target="_blank"
          href="https://github.com/Starz0r/AreWeAntiCheatYet/issues/new?template=0-new-game.yml"
        >
          Add it here!
        </Anchor>
      </Group>
      <Group position="center" spacing={5}>
        Made with <IconHeartHandshake color="red" /> by{' '}
        <Anchor target="_blank" href="https://github.com/Starz0r">
          Starz0r
        </Anchor>
        &
        <Anchor target="_blank" href="https://github.com/Curve">
          Curve
        </Anchor>
      </Group>
      <Group position="center">
        Last updated {new Date(lastBuildTime).toLocaleDateString()} (
        {new Date(lastBuildTime).toLocaleTimeString()})
      </Group>
    </Stack>
  );
}
