import { Group, Stack, Switch, SwitchProps, Text, Title } from '@mantine/core';

export default function({ label, description, ...props }: Omit<SwitchProps, 'onLabel' | 'offLabel'>) {
    return (
        <Group wrap="nowrap" justify="space-between">
            <Stack>
                <Title order={3}>{label}</Title>
                <Text c="dimmed">{description}</Text>
            </Stack>
            <Switch onLabel="ON" offLabel="OFF" {...props} />
        </Group>
    );
}
