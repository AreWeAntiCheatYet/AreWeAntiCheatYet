import { Card, Center, DefaultProps, Group, MantineColor, RingProgress, Stack, Title } from '@mantine/core';
import { forwardRef } from 'react';

interface StatProps extends Partial<DefaultProps> {
  icon: React.ReactNode;
  color: MantineColor;
  height?: number;
  width?: number;

  value: number;
  total: number;

  text: string;
}

export default forwardRef<HTMLDivElement, StatProps>(({ color, value, text, total, icon, w, h }: StatProps, ref) => {
  return (
    <Card withBorder w={w || 400} h={h || 120} ref={ref} p="xs" radius="md">
      <Group noWrap>
        <RingProgress
          roundCaps
          size={100}
          thickness={9}
          label={<Center>{icon}</Center>}
          sections={[{ value: (value / total) * 100, color }]}
        />
        <Stack spacing={5}>
          <Title order={4} color="dimmed">
            {text}
          </Title>
          <Title order={2}>{value}</Title>
        </Stack>
      </Group>
    </Card>
  );
});
