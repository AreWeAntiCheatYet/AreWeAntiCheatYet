import {
  ColorSwatch,
  DefaultProps,
  Group,
  RingProgress,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import OverviewType from '../types/overview';

interface LegendProps {
  name: string;
  color: string;
  amount: number;
  percentage: number;
  description: string;
}

function Legend({ name, color, amount, percentage, description }: LegendProps) {
  return (
    <Tooltip withArrow label={description}>
      <Group align="center">
        <ColorSwatch color={color} />
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
  const theme = useMantineTheme();

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
          name="Supported"
          color={theme.colors.green[6]}
          amount={overview.supported}
          description="Game is officially supported"
          percentage={(overview.supported / overview.total) * 100}
        />
        <Legend
          name="Planned"
          color={theme.colors.violet[6]}
          amount={overview.planned}
          description="Game plans to support Proton/Wine"
          percentage={(overview.planned / overview.total) * 100}
        />
        <Legend
          name="Running"
          color={theme.colors.cyan[6]}
          amount={overview.running}
          description="No official statement but runs fine (may require tinkering)"
          percentage={(overview.running / overview.total) * 100}
        />
        <Legend
          name="Broken"
          color={theme.colors.orange[6]}
          amount={overview.broken}
          description="Game does not work (online)"
          percentage={(overview.broken / overview.total) * 100}
        />
        <Legend
          name="Denied"
          color={theme.colors.red[6]}
          amount={overview.denied}
          description="Linux support was explicitly denied"
          percentage={(overview.denied / overview.total) * 100}
        />
      </Stack>
    </Group>
  );
}
