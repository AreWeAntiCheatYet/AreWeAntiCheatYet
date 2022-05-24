import { Accordion, DefaultProps, Divider, Progress, Stack, Text } from '@mantine/core';
import { IconListDetails } from '@tabler/icons';
import Overview from '../types/overview';
import StyledAccordion from './StyledAccordion';

interface BreakdownProps extends DefaultProps {
  breakdown: [string, Overview][];
}

export default function Breakdown({ breakdown, ...props }: BreakdownProps) {
  return (
    <StyledAccordion icon={<IconListDetails size={16} />} {...props}>
      <Accordion.Item label="Breakdown">
        {breakdown.map(([anticheat, overview]) => (
          <Stack key={anticheat} sx={{ marginTop: 10 }}>
            <Text>{anticheat}</Text>
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
      </Accordion.Item>
    </StyledAccordion>
  );
}
