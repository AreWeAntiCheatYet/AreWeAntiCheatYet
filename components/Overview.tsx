import { DefaultProps, Group, RingProgress, Stack, Text, ThemeIcon, Tooltip } from '@mantine/core';
import {
  IconCheck,
  IconClock,
  IconMinus,
  IconQuestionMark,
  IconThumbUp,
  IconX,
} from '@tabler/icons';
import OverviewType from '../types/overview';

interface LegendProps {
  name: string;
  color: string;
  amount: number;
  percentage: number;
  description: string;
}

function Legend({ name, color, amount, percentage, description }: LegendProps) {
  const icon = (() => {
    switch (color) {
      case 'red':
        return <IconX size={18} />;
      case 'orange':
        return <IconMinus size={18} />;
      case 'green':
        return <IconCheck size={18} />;
      case 'cyan':
        return <IconThumbUp size={18} />;
      case 'violet':
        return <IconClock size={18} />;
      default:
        return <IconQuestionMark size={18} />;
    }
  })();

  return (
    <Tooltip withArrow label={description}>
      <Group align="center">
        <ThemeIcon radius="xl" variant="filled" color={color}>
          {icon}
        </ThemeIcon>
        <Text>
          {amount} {name} ({percentage.toFixed(1)}%)
        </Text>
      </Group>
    </Tooltip>
  );
}

interface OverviewProps extends DefaultProps {
  overview: OverviewType;
}

export default function Overview({ overview, ...props }: OverviewProps) {
  return (
    <Group {...props}>
      <Group position="center">
        <RingProgress
          label={<Text align="center">{overview.total}</Text>}
          sections={[
            { value: (overview.denied / overview.total) * 100, color: 'red' },
            { value: (overview.broken / overview.total) * 100, color: 'orange' },
            { value: (overview.running / overview.total) * 100, color: 'cyan' },
            { value: (overview.supported / overview.total) * 100, color: 'green' },
            { value: (overview.planned / overview.total) * 100, color: 'violet' },
          ]}
        />
      </Group>
      <Stack sx={{ marginLeft: 15 }}>
        <Legend
          color="green"
          name="Supported"
          amount={overview.supported}
          description="Game is officially supported"
          percentage={(overview.supported / overview.total) * 100}
        />
        <Legend
          color="violet"
          name="Planned"
          amount={overview.planned}
          description="Game plans to support Proton/Wine"
          percentage={(overview.planned / overview.total) * 100}
        />
        <Legend
          color="cyan"
          name="Running"
          amount={overview.running}
          description="No official statement but runs fine (may require tinkering)"
          percentage={(overview.running / overview.total) * 100}
        />
        <Legend
          color="orange"
          name="Broken"
          amount={overview.broken}
          description="Game does not work (online)"
          percentage={(overview.broken / overview.total) * 100}
        />
        <Legend
          color="red"
          name="Denied"
          amount={overview.denied}
          description="Linux support was explicitly denied"
          percentage={(overview.denied / overview.total) * 100}
        />
      </Stack>
    </Group>
  );
}
