import { Anchor, Group, Stack } from '@mantine/core';
import { IconHeart } from '@tabler/icons';

export default function AppFooter() {
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
      <Group position="center">
        Made with <IconHeart color="red" /> by Starz0r & Curve
      </Group>
    </Stack>
  );
}
