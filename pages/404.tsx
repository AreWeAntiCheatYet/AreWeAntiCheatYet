import { Center, Group, Text } from '@mantine/core';
import { IconMoodSad } from '@tabler/icons-react';

export default function() {
    return (
        <Center style={{ width: '100%', height: '100%' }}>
            <Group>
                <IconMoodSad size={64} />
                <Text fz="lg" fw={700}>
                    We couldn't find the page you're looking for!
                </Text>
            </Group>
        </Center>
    );
}
