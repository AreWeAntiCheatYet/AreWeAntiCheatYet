import { Accordion, ActionIcon, Avatar, Box, Button, Checkbox, Group, Input, MultiSelect, NativeSelect, ScrollArea, Stack, Switch, Text, TextInput } from "@mantine/core";
import { Game, Status } from "../src/types/games";
import GamesJSON from '../games.json';
import { randomId, useMediaQuery, useViewportSize } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { getLogo, query, stats } from '../src/utils/games';
import { useForm } from "@mantine/form";


const Games = GamesJSON as Game[];
const anticheats = [...new Set(Games.map((x) => x.anticheats).flat())].map((ac) => {
    // QUEST: why does attempting to get the anti-cheat logo cause the page to crash?
    // QUEST: the error message is in some unrelated place too... ugh.
    //const logo = getLogo(ac);
    //return { value: ac, label: ac, image: logo };
    return { value: ac, label: ac }
});

export default function({ style }) {
    const { width } = useViewportSize();

    const form = useForm({ initialValues: Games });

    const body = form.values.map((game, idx) => {
        const { name, slug, logo } = game;

        return (
            <Accordion.Item key={slug} value={slug}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Accordion.Control>
                        <Group noWrap>
                            <Avatar src={logo} radius="x1" size="lg" />
                            <Text>{name}</Text>
                        </Group>
                    </Accordion.Control>
                    <ActionIcon size="lg" onClick={() => {
                        form.values.splice(idx, 1);

                        // HACK: forces the page to re-render, but this only really works once
                        // documentation of course doesn't describe how to properly call this
                        // with also no proper way to push to a form who's root is an array
                        form.setDirty();
                    }}>
                        <IconTrash size={16} />
                    </ActionIcon>
                </Box>
                <Accordion.Panel>
                    <form>
                        <Stack key={slug}>
                            <TextInput label="URL" {...form.getInputProps(`${idx}.url`)} />
                            <TextInput label="Slug" required {...form.getInputProps(`${idx}.slug`)} />
                            <TextInput label="Game Name" required {...form.getInputProps(`${idx}.name`)} />
                            <TextInput label="Logo URL" {...form.getInputProps(`${idx}.logo`)} />
                            <Checkbox label="Runs on Linux natively?" {...form.getInputProps(`${idx}.native`, { type: "checkbox" })} />

                            <NativeSelect data={['Broken', 'Running', 'Denied', 'Supported', 'Planned']} label="Status" {...form.getInputProps(`${idx}.status`)} />

                            <TextInput label="Reference Information on Status" {...form.getInputProps(`${idx}.reference`)} />
                            <MultiSelect data={anticheats} label="Anti-Cheat(s) In-use" searchable required {...form.getInputProps(`${idx}.anticheats`)} />

                            Updates
                            {form.values[idx].updates.map((_, u_idx) => {
                                return (
                                    <div key={randomId()}>
                                        <TextInput label="Title" {...form.getInputProps(`${idx}.updates.${u_idx}.name`)} />
                                        <TextInput label="Reference URL" {...form.getInputProps(`${idx}.updates.${u_idx}.reference`)} />
                                        <TextInput label="Date & Time" {...form.getInputProps(`${idx}.updates.${u_idx}.date`)} />
                                        <Button color="red" onClick={() => { form.removeListItem(`${idx}.updates`, u_idx) }}>
                                            Remove Above Update
                                        </Button>
                                    </div>
                                )
                            })}
                            <Button onClick={() => { form.insertListItem(`${idx}.updates`, { name: "", date: (new Date(Date.now())).toUTCString(), reference: "" }) }}>
                                Add Update
                            </Button>

                            Notes
                            {form.values[idx].notes.map((_, note_idx) => {
                                return (
                                    <div key={randomId()}>
                                        <TextInput label="Title" {...form.getInputProps(`${idx}.notes.${note_idx}.0`)} />
                                        <TextInput label="Reference URL" {...form.getInputProps(`${idx}.notes.${note_idx}.1`)} />
                                        <Button color="red" onClick={() => { form.removeListItem(`${idx}.notes`, note_idx) }}>
                                            Remove Above Note
                                        </Button>
                                    </div>
                                )
                            })}
                            <Button onClick={() => { form.insertListItem(`${idx}.notes`, new Array(2)) }}>
                                Add Note
                            </Button>

                            <div>
                                {
                                    // TODO: editable storeIds go here
                                }
                            </div>

                        </Stack>
                    </form>
                </Accordion.Panel>
            </Accordion.Item>
        )
    });

    return (
        <Stack align="center">
            <ScrollArea type="never" w={style ? undefined : width * 0.8} sx={style}>
                <Accordion defaultValue="gamelist" >
                    {body}

                    <Button color="lime" onClick={() => {
                        form.values.push({ url: "", slug: "new-game-" + randomId(), name: "", logo: "", native: false, status: "Broken", reference: "", anticheats: new Array(1), updates: new Array(), notes: new Array(), storeIds: {} });
                        // HACK: forces the page to re-render, but this only really works once
                        // documentation of course doesn't describe how to properly call this
                        // with also no proper way to push to a form who's root is an array
                        form.setDirty();
                    }}>
                        Add New Game
                    </Button>

                </Accordion>
            </ScrollArea>
        </Stack>
    );
}
