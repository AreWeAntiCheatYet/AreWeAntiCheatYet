import { ActionIcon, Avatar, Group, Header, Title } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons';
import ThemeToggle from './ThemeToggle';

export default function AppHeader() {
  return (
    <Header height={60}>
      <Group position="apart" sx={{ marginLeft: 15, marginRight: 15, height: '100%' }} noWrap>
        <Group position="center">
          <Avatar src="icon.webp" size="lg" />
          <Title order={4}>Are We Anti-Cheat Yet?</Title>
        </Group>
        <Group position="center">
          <ActionIcon
            variant="light"
            color="violet"
            radius="xl"
            component="a"
            target="_blank"
            href="https://github.com/Starz0r/AreWeAntiCheatYet"
          >
            <IconBrandGithub size={18} />
          </ActionIcon>
          <ThemeToggle />
        </Group>
      </Group>
    </Header>
  );
}
