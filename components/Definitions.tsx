import { Accordion, AccordionProps, Group, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconCheck, IconClock, IconInfoCircle, IconMinus, IconThumbUp, IconX } from '@tabler/icons';
import StyledAccordion from './StyledAccordion';

export default function Definitions(props: Omit<AccordionProps, 'children'>) {
  return (
    <StyledAccordion {...props}>
      <Accordion.Item value="legend">
        <Accordion.Control icon={<IconInfoCircle size={16} />}>Legend</Accordion.Control>
        <Accordion.Panel>
          <Stack>
            <Group noWrap>
              <ThemeIcon radius="xl" variant="filled" color="green">
                <IconCheck size={18} />
              </ThemeIcon>
              <Title order={5}>Supported</Title>
            </Group>
            <Text>
              Games that run on Linux due to the developers going out of their way to enable the
              anti-cheat to run on Linux or games that have anti-cheat which works perfectly fine
              out of the box under Wine/Proton (e.g. Overwatch, Battlefield 4)
            </Text>
            <Group noWrap>
              <ThemeIcon radius="xl" variant="filled" color="violet">
                <IconClock size={18} />
              </ThemeIcon>
              <Title order={5}>Planned</Title>
            </Group>
            <Text>
              Games where the developers have explicitly stated that they plan to enable their
              anti-cheat to work on Linux or that they plan to support the game natively
            </Text>
            <Group noWrap>
              <ThemeIcon radius="xl" variant="filled" color="cyan">
                <IconThumbUp size={18} />
              </ThemeIcon>
              <Title order={5}>Running</Title>
            </Group>
            <Text>
              Games that will run on Linux without impact on online or offline gameplay but may
              require you to perform certain tinkering steps (This does not include any means of
              explicitly bypassing the anti-cheat)
            </Text>
            <Group noWrap>
              <ThemeIcon radius="xl" variant="filled" color="orange">
                <IconMinus size={18} />
              </ThemeIcon>
              <Title order={5}>Broken</Title>
            </Group>
            <Text>
              Games that will not run both online and offline on Linux due to the deployed
              anti-cheat solution
            </Text>
            <Group noWrap>
              <ThemeIcon radius="xl" variant="filled" color="red">
                <IconX size={18} />
              </ThemeIcon>
              <Title order={5}>Denied</Title>
            </Group>
            <Text>
              Games where the developers have explicitly stated that they will not enable the
              anti-cheat solution to work on Linux or have denied the possibility of Linux support
            </Text>
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </StyledAccordion>
  );
}
