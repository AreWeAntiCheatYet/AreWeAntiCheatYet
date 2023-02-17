import { Avatar, Badge, Button, ButtonProps, Group, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { openModal } from '@mantine/modals';
import { IconQuestionMark } from '@tabler/icons-react';
import Icons from '../src/static/icons';

function Description() {
  return (
    <Stack>
      <Group>
        <ThemeIcon color={Icons.supported.color} radius="xl">
          <Icons.supported.icon size={16} />
        </ThemeIcon>
        <Title order={5}>Supported</Title>
      </Group>
      <Text>
        Games that run on Linux due to the developers going out of their way to enable the anti-cheat to run on Linux or
        games that have anti-cheat which works perfectly fine out of the box under Wine/Proton (e.g. Overwatch,
        Battlefield 4)
      </Text>
      <Group>
        <ThemeIcon color={Icons.running.color} radius="xl">
          <Icons.running.icon size={16} />
        </ThemeIcon>
        <Title order={5}>Running</Title>
      </Group>
      <Text>
        Games that will run on Linux without impact on online gameplay but may require you to perform certain tinkering
        steps (This does not include any means of explicitly bypassing the anti-cheat)
      </Text>
      <Group>
        <ThemeIcon color={Icons.planned.color} radius="xl">
          <Icons.planned.icon size={16} />
        </ThemeIcon>
        <Title order={5}>Planned</Title>
      </Group>
      <Text>
        Games where the developers have explicitly stated that they plan to enable their anti-cheat to work on Linux or
        that they plan to support the game natively
      </Text>
      <Group>
        <ThemeIcon color={Icons.broken.color} radius="xl">
          <Icons.broken.icon size={16} />
        </ThemeIcon>
        <Title order={5}>Broken</Title>
      </Group>
      <Text>Games that will not run online due to the deployed anti-cheat solution</Text>
      <Group>
        <ThemeIcon color={Icons.denied.color} radius="xl">
          <Icons.denied.icon size={16} />
        </ThemeIcon>
        <Title order={5}>Denied</Title>
      </Group>
      <Text>
        Games where the developers have explicitly stated that they will not enable the anti-cheat solution to work on
        Linux or have denied the possibility of Linux support
      </Text>
    </Stack>
  );
}

export default function ({ ...props }: Omit<ButtonProps, 'color' | 'leftIcon' | 'variant' | 'onClick'>) {
  return (
    <Button
      {...props}
      color="gray"
      variant="light"
      leftIcon={<IconQuestionMark />}
      onClick={() => openModal({ children: <Description /> })}
    >
      What does "Supported", "Running", ... mean?
    </Button>
  );
}
