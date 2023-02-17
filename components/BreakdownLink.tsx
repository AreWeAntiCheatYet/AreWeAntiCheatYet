import { Button, ButtonProps } from '@mantine/core';
import { IconChartArea } from '@tabler/icons-react';
import { useRouter } from 'next/router';

export default function ({ ...props }: Omit<ButtonProps, 'color' | 'leftIcon' | 'variant' | 'onClick'>) {
  const { basePath } = useRouter();

  return (
    <Button
      {...props}
      color="gray"
      component="a"
      variant="light"
      target="_blank"
      href={`${basePath}/breakdown`}
      leftIcon={<IconChartArea />}
    >
      Anti-Cheat Breakdown
    </Button>
  );
}
