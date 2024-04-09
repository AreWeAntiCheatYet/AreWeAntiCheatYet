import { Group, MantineColor, RingProgress, SimpleGrid, Stack, Text, ThemeIcon, Tooltip } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconTrendingUp, TablerIconsProps } from '@tabler/icons-react';
import icons from '../src/static/icons';
import { Settings } from '../src/types/settings';
import StatCard from './StatCard';

export interface OverviewProps {
    variant: Settings['overview'];
    vertical?: boolean;
    supported: number;
    planned: number;
    running: number;
    broken: number;
    denied: number;
    total: number;
}

function RingOverview({ total, ...statuses }: Omit<Partial<OverviewProps>, 'variant' | 'vertical'>) {
    const Description = ({
        value,
        label,
        color,
        Icon,
    }: {
        value: number;
        label: string;
        color: MantineColor;
        Icon: (props: TablerIconsProps) => JSX.Element;
    }) => (
        <Group wrap="nowrap">
            <ThemeIcon radius="xl" color={color}>
                <Icon size={16} />
            </ThemeIcon>
            <Text>
                {value} {label} ({((value / total) * 100).toFixed(0)}%)
            </Text>
        </Group>
    );

    return (
        <Group wrap="nowrap">
            <RingProgress
                sections={Object.keys(icons).map((status) => {
                    const value = statuses[status];
                    const color = icons[status].color;
                    const name = status[0].toUpperCase() + status.slice(1);
                    return { color: color, value: (value / total) * 100, tooltip: `${name} (${value})` };
                })}
                label={
                    <Text fw={700} size="lg" ta="center">
                        {total}
                    </Text>
                }
            />
            <Stack align="stretch">
                {Object.keys(icons).map((status) => {
                    const value = statuses[status];
                    const { color, icon } = icons[status];
                    const label = status[0].toUpperCase() + status.slice(1);
                    return <Description key={status} color={color} value={value} Icon={icon} label={label} />;
                })}
            </Stack>
        </Group>
    );
}

function StatOverview({ variant, vertical, total, ...stats }: OverviewProps) {
    const breakpoint = useMediaQuery('(min-width: 900px)');
    const width = breakpoint ? undefined : 300;
    const detailed = variant === 'detailed';

    const cols = vertical ? 1 : 2;

    // QUEST: breakpoints used to be defined on SimpleGrid
    // but as of Mantine v7, you can no longer defined them.
    // However removing them and comparing between the Live
    // site and the refactor did not show any visual differences.
    // so what was it really used for? I think only Curve would know.
    return (
        <SimpleGrid cols={cols}>
            {detailed && (
                <StatCard icon={<IconTrendingUp />} text="Total Games" w={width} total={total} value={total} color="gray" />
            )}
            {detailed && (
                <StatCard
                    icon={<icons.planned.icon />}
                    text="Planned Games"
                    w={width}
                    total={total}
                    value={stats.planned}
                    color={icons.planned.color}
                />
            )}
            <Tooltip label="Includes Games listed as 'Supported' or 'Running'" withArrow transitionProps={{ transition: "slide-up" }} >
                <StatCard
                    icon={<icons.supported.icon />}
                    text="Working Games"
                    w={width}
                    total={total}
                    value={stats.supported + stats.running}
                    color={icons.supported.color}
                />
            </Tooltip>
            <Tooltip label="Includes Games listed as 'Denied' or 'Broken'" withArrow transitionProps={{ transition: "slide-up" }} >
                <StatCard
                    icon={<icons.broken.icon />}
                    text="Broken Games"
                    w={width}
                    total={total}
                    value={stats.broken + stats.denied}
                    color={icons.denied.color}
                />
            </Tooltip>
        </SimpleGrid>
    );
}

export default function({ variant, ...props }: OverviewProps) {
    return variant !== 'ring' ? <StatOverview variant={variant} {...props} /> : <RingOverview {...props} />;
}
