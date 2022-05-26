import { Accordion, DefaultProps, Group, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconCheck, IconClock, IconInfoCircle, IconMinus, IconThumbUp, IconX } from '@tabler/icons';
import StyledAccordion from './StyledAccordion';

export default function Definitions({ ...props }: DefaultProps) {
  return (
    <StyledAccordion icon={<IconInfoCircle size={16} />} {...props}>
      <Accordion.Item label="State Definitions">
        <Stack>
          <Group noWrap>
            <ThemeIcon radius="xl" variant="filled" color="green">
              <IconCheck size={18} />
            </ThemeIcon>
            <Title order={5}>Supported</Title>
          </Group>
          <Text>
            Games that run on linux due to the developers going out of their way to enable the
            Anti-Cheat to run on linux or games that have Anti-Cheat which works perfectly fine out
            of the box under Wine/Proton (e.g. Overwatch, Battlefield 4)
          </Text>
          <Group noWrap>
            <ThemeIcon radius="xl" variant="filled" color="violet">
              <IconClock size={18} />
            </ThemeIcon>
            <Title order={5}>Planned</Title>
          </Group>
          <Text>
            Games where the developers have explicitly stated that they plan to enable their
            Anti-Cheat to work on linux or that they plan to support the game natively
          </Text>
          <Group noWrap>
            <ThemeIcon radius="xl" variant="filled" color="cyan">
              <IconThumbUp size={18} />
            </ThemeIcon>
            <Title order={5}>Running</Title>
          </Group>
          <Text>
            Games that will run on linux without impact on online or offline gameplay but may
            require you to perform certain tinkering steps (This does not include any means of
            explicitly bypassing the Anti-Cheat)
          </Text>
          <Group noWrap>
            <ThemeIcon radius="xl" variant="filled" color="orange">
              <IconMinus size={18} />
            </ThemeIcon>
            <Title order={5}>Broken</Title>
          </Group>
          <Text>
            Games that will not run both online and offline on linux due to the deployed Anti-Cheat
            solution
          </Text>
          <Group noWrap>
            <ThemeIcon radius="xl" variant="filled" color="red">
              <IconX size={18} />
            </ThemeIcon>
            <Title order={5}>Denied</Title>
          </Group>
          <Text>
            Games where the developers have explicitly stated that they will not enable the
            Anti-Cheat solution to work on linux or have denied the possibility of linux support
          </Text>
        </Stack>
      </Accordion.Item>
    </StyledAccordion>
  );
}
