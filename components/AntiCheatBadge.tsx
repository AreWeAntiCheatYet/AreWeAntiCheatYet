import { ThemeIcon, Tooltip, TooltipProps } from '@mantine/core';
import { IconQuestionMark } from '@tabler/icons-react';
import { getLogo } from '../src/utils/games';

interface AntiCheatBadgeProps extends Omit<TooltipProps, 'transition' | 'events' | 'children' | 'label'> {
    height: number;
    anticheat: string;
}

export default function({ anticheat, height, ...props }: AntiCheatBadgeProps) {
    const logo = getLogo(anticheat);

    return (
        <Tooltip {...props} label={anticheat} transitionProps={{ transition: "slide-up" }} events={{ hover: true, touch: true, focus: true }}>
            {logo ? (
                <img src={logo} alt={anticheat} height={height} />
            ) : (
                <ThemeIcon color="gray" radius="xl" size={height}>
                    <IconQuestionMark />
                </ThemeIcon>
            )}
        </Tooltip>
    );
}
