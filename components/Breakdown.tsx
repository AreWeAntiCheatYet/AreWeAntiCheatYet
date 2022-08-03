import { Accordion, AccordionProps, Divider, Group, Progress, Stack, Text } from '@mantine/core';
import { IconListDetails } from '@tabler/icons';
import Overview from '../types/overview';
import StyledAccordion from './StyledAccordion';

interface BreakdownProps extends AccordionProps {
  statusOverview: Overview;
  breakdown: [string, Overview][];
}

export default function Breakdown({ statusOverview, breakdown, ...props }: BreakdownProps) {
  return (
    <StyledAccordion {...props}>
      <Accordion.Item value="breakdown">
        <Accordion.Control icon={<IconListDetails size={16} />}>Breakdown</Accordion.Control>
        <Accordion.Panel>
          <Stack>
            <Group noWrap>
              <Text color="green">Supported & Running</Text> <b>vs</b>{' '}
              <Text color="red">Broken & Denied</Text>
            </Group>
            <Progress
              size="xl"
              sections={[
                {
                  value:
                    ((statusOverview.running + statusOverview.supported) / statusOverview.total) *
                    100,
                  color: 'green',
                  label: `${statusOverview.running + statusOverview.supported} (${(
                    ((statusOverview.running + statusOverview.supported) / statusOverview.total) *
                    100
                  ).toFixed(1)}%)`,
                },
                {
                  value:
                    ((statusOverview.broken + statusOverview.denied) / statusOverview.total) * 100,
                  color: 'red',
                  label: `${statusOverview.broken + statusOverview.denied} (${(
                    ((statusOverview.broken + statusOverview.denied) / statusOverview.total) *
                    100
                  ).toFixed(1)})`,
                },
                {
                  value:
                    100 -
                    (((statusOverview.broken + statusOverview.denied) / statusOverview.total) *
                      100 +
                      ((statusOverview.running + statusOverview.supported) / statusOverview.total) *
                        100),
                  color: 'gray',
                  label: '...',
                },
              ]}
            />
            <Divider />
          </Stack>
          {breakdown.map(([anticheat, overview]) => (
            <Stack key={anticheat} sx={{ marginTop: 10 }}>
              <Text>
                {anticheat} ({overview.total})
              </Text>
              <Progress
                size="xl"
                sections={[
                  {
                    value: (overview.supported / overview.total) * 100,
                    color: 'green',
                    label: `${overview.supported}`,
                  },
                  {
                    value: (overview.running / overview.total) * 100,
                    color: 'cyan',
                    label: `${overview.running}`,
                  },
                  {
                    value: (overview.planned / overview.total) * 100,
                    color: 'violet',
                    label: `${overview.planned}`,
                  },
                  {
                    value: (overview.broken / overview.total) * 100,
                    color: 'orange',
                    label: `${overview.broken}`,
                  },
                  {
                    value: (overview.denied / overview.total) * 100,
                    color: 'red',
                    label: `${overview.denied}`,
                  },
                ]}
              />
              <Divider />
            </Stack>
          ))}
        </Accordion.Panel>
      </Accordion.Item>
    </StyledAccordion>
  );
}
