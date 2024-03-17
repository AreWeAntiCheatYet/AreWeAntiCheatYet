import { Group, rgba, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { openConfirmModal } from '@mantine/modals';
import { hideNotification } from '@mantine/notifications';
import { Fragment } from 'react';
import { Games } from '../src/static';
import { Change } from '../src/types/games';
import { getStyle } from '../src/utils/games';
import { themeColor } from '../src/utils/theming';
import Changes from './Changes';

interface ChangeNotificationProps {
    changes: Change[];
    setPreviousGames: (v: string) => void;
}

export default function({ changes, setPreviousGames }: ChangeNotificationProps) {
    const breakpoint = useMediaQuery('(min-width: 800px)');
    const multiple = changes.length > 1;
    const theme = useMantineTheme();

    const highlightColor = theme.primaryColor;

    return (
        <Group p={0} gap={5} wrap="nowrap">
            <Text>
                There {multiple ? 'are' : 'is'} {changes.length} new change{multiple ? 's' : ''}!
            </Text>
            <Text
                c={highlightColor}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                    hideNotification('changes');
                    openConfirmModal(ChangesModal(breakpoint, changes, setPreviousGames));
                }}
            >
                Show more
            </Text>
        </Group>
    );
}

export function ChangesModal(breakpoint: boolean, changes: Change[], setPreviousGames: (v: string) => void) {
    return {
        size: breakpoint ? 600 : undefined,
        fullScreen: !breakpoint,
        children: (
            <Stack>
                {changes.map((change) => (
                    <Fragment key={change.recent.name}>
                        <Title mt={50} order={5}>
                            {change.recent.name}
                        </Title>
                        <Changes withCaption={false} change={change} />
                    </Fragment>
                ))}
            </Stack>
        ),
        labels: { confirm: 'Acknowledge', cancel: 'Close' },
        onConfirm: () => setPreviousGames(JSON.stringify(Games)),
    };
}
