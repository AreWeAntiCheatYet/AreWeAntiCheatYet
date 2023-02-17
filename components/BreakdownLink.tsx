import { Button, ButtonProps } from '@mantine/core';
import { IconChartArea } from '@tabler/icons-react';

export default function ({ ...props }: Omit<ButtonProps, 'color' | 'leftIcon' | 'variant' | 'onClick'>) {
  return (
    <Button
      {...props}
      color="gray"
      component="a"
      target="_blank"
      variant="light"
      href="/breakdown"
      leftIcon={<IconChartArea />}
    >
      Anti-Cheat Breakdown
    </Button>
  );
}
