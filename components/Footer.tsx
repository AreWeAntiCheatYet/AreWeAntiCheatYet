import { Anchor, Group, Stack } from '@mantine/core';
import { IconHeartHandshake } from '@tabler/icons';
import { useEffect, useState } from 'react';

interface AppFooterProps {
  lastBuildTime: number;
}

export default function AppFooter({ lastBuildTime }: AppFooterProps) {
  const [buildTimeUTC, setBuildTimeUTC] = useState('-');
  const [buildTimeLocal, setBuildTimeLocal] = useState('-');

  useEffect(() => {
    setBuildTimeUTC(new Date(lastBuildTime).toUTCString());
    setBuildTimeLocal(new Date(lastBuildTime).toLocaleString());
  }, [lastBuildTime]);

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
        Last updated {buildTimeLocal} ({buildTimeUTC})
      </Group>
    </Stack>
  );
}
