import { Accordion, Avatar, Group, ScrollArea, Stack, Text } from "@mantine/core";
import { Game } from "../src/types/games";
import GamesJSON from '../games.json';
import { useMediaQuery, useViewportSize } from "@mantine/hooks";
export const Games = GamesJSON as Game[];

export default function({ style }) {
    const { width } = useViewportSize();

    const body = Games.map((game) => {
        const { name, url, slug, logo } = game;
        const stat = game.status;
        const ref = game.reference;
        const anticheats = game.anticheats;
        const upd = game.updates;
        const notes = game.notes;
        const stores = game.storeIds;

        return (
            <Accordion.Item key={slug} value={slug}>
                <Accordion.Control>
                    <Group noWrap>
                        <Avatar src={logo} radius="x1" size="lg" />
                        <Text>{name}</Text>
                    </Group>
                </Accordion.Control>
                <Accordion.Panel>{url}</Accordion.Panel>
            </Accordion.Item>
        )
    })
    return (
        <Stack align="center">
            <ScrollArea type="never" w={style ? undefined : width * 0.8} sx={style}>
                <Accordion defaultValue="gamelist" >
                    {body}
                </Accordion>
            </ScrollArea>
        </Stack>
    )
}
