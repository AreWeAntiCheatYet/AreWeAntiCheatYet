import { Group, Stack, Switch, SwitchProps, Text, Title } from '@mantine/core';

export default function ({ label, description, ...props }: Omit<SwitchProps, 'onLabel' | 'offLabel'>) {
  return (
    <Group noWrap position="apart">
      <Stack>
        <Title order={3}>{label}</Title>
        <Text color="dimmed">{description}</Text>
      </Stack>
      <Switch onLabel="ON" offLabel="OFF" {...props} />
    </Group>
  );
}
