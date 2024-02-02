import { Card, Radio, RadioProps, Stack, Text, useMantineColorScheme, useMantineTheme } from '@mantine/core';

interface BannerRadioProps extends Omit<RadioProps, 'label'> {
    children: React.ReactNode;
}

export default function({ description, children, ...props }: BannerRadioProps) {
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const background = colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3];

    return (
        <Card
            withBorder
            style={{
                border: props.checked ? `2px solid ${theme.colors[theme.primaryColor][6]}` : undefined,
            }}
        >
            <Card.Section bg={background}>{children}</Card.Section>
            <Stack mt={10} align="center">
                <Text fz="md" c="dimmed" style={{ textAlign: "center" }}>
                    {description}
                </Text>
                <Radio {...props} />
            </Stack>
        </Card>
    );
}
