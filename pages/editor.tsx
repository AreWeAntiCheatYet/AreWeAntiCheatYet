import { Accordion, ActionIcon, Alert, Avatar, Box, Button, Checkbox, Group, Input, MultiSelect, NativeSelect, ScrollArea, Stack, Switch, Text, TextInput } from "@mantine/core";
import { Game, Status } from "../src/types/games";
import GamesJSON from '../games.json';
import { randomId, useMediaQuery, useViewportSize } from "@mantine/hooks";
import { IconAlertCircle, IconTrash } from "@tabler/icons-react";
import { getLogo, query, stats } from '../src/utils/games';
import { useForm } from "@mantine/form";
import React from "react";

const node_assert = require("assert");

// NOTE: TypeScript likes to do it's job a bit too well. In
// this case, it's evaluating every entry in this array to
// the type "Game". However some values in the JSON file
// are simply missing, as they are optional, or not required,
// and because they are not marked as such in the interface
// definition, we'll get errors that the type does not meet
// the requirements to properly satisfy it. For now, converting
// to unknown/any then back to the type we actually want will silence this error.
const Games = GamesJSON as unknown as Game[];
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
    const [submitResult, setSubmitResult] = React.useState(null);
    const [selectedGame, setSelectedGame] = React.useState(0);

    const game = form.values[selectedGame];
    const idx = selectedGame;
    const slug = game.slug;
    const body = (
        // QUEST: using slug like this causes an entire re-render when editing it
        // usually this wouldn't be a problem, but because that would also cause
        // you to unselect that text input in the process, it becomes fairly annoying
        // to try and edit the slug in any way. the question now becomes what could I use
        // as a key instead? the index? do I even need a key here anymore?
        <Accordion.Item key={slug} value={slug}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Accordion.Control>
                    <Group noWrap>
                        <Avatar src={game.logo} radius="xl" size="lg" />
                        <Text>{game.name}</Text>
                    </Group>
                </Accordion.Control>
                <ActionIcon size="lg" onClick={() => {
                    form.values.splice(idx, 1);

                    // HACK: forces the page to re-render, but this only really works once
                    // documentation of course doesn't describe how to properly call this
                    // with also no proper way to push to a form who's root is an array
                    form.setDirty(null);

                    // HACK: we might end up on a non-existent index if we're at the end of the list.
                    // instead of calculating it, we'll just set the working item to 0 again!
                    setSelectedGame(0);
                }}>
                    <IconTrash size={16} />
                </ActionIcon>
            </Box>
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
                {game.notes.map((_, note_idx) => {
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
        </Accordion.Item>
    );

    return (
        <Stack align="center">
            <ScrollArea type="never" w={style ? undefined : width * 0.8} sx={style}>
                <Accordion defaultValue="gamelist" >
                    <NativeSelect id="gamesDropdown" data={
                        // QUEST: should I use value here instead of defaultValue
                        form.values.map((game) => {
                            return game.name;
                        }
                        )} label="Games" onChange={(e) => {
                            setSelectedGame(e.currentTarget.selectedIndex)
                        }} defaultValue={form.values[selectedGame].name} />
                    <form>
                        {body}

                        <Button color="lime" onClick={() => {
                            form.values.push({ url: "", slug: "new-game-" + randomId(), name: "", logo: "", native: false, status: "Broken", reference: "", anticheats: new Array(1), updates: new Array(), notes: new Array(), storeIds: {}, dateChanged: (new Date(Date.now())).toISOString() });

                            setSelectedGame(form.values.length - 1);

                            // HACK: forces the page to re-render, but this only really works once
                            // documentation of course doesn't describe how to properly call this
                            // with also no proper way to push to a form who's root is an array
                            form.setDirty(null);
                        }}>
                            Add New Game
                        </Button>

                        <Button variant="light" onClick={async () => {
                            // any game that has had it's data changed from it's inital value needs to
                            // have it's dateChanged value updated

                            // TODO: calculate these two maps ahead of time
                            const formMap: Map<string, Game> = new Map(form.values.map((g) => [g.slug, g]));
                            const defaultGamesMap: Map<string, Game> = new Map(Games.map((g) => [g.slug, g]));

                            for (const [k, v] of formMap) {
                                try {
                                    // TODO: use fast-deep-equal or similar here
                                    node_assert.deepStrictEqual(v, defaultGamesMap.get(k));
                                } catch (_) {
                                    form.values.find((g, i) => {
                                        if (g.slug === k) {
                                            form.values[i].dateChanged = (new Date(Date.now())).toISOString();
                                        }
                                    });
                                }
                            }

                            const opts: RequestInit = {
                                method: "POST",
                                mode: "cors",
                                cache: "no-cache",
                                referrerPolicy: "no-referrer",
                                body: JSON.stringify(form.values, null, 4),
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            }

                            try {
                                const req = await fetch("https://export.areweanticheatyet.com/submit", opts);
                                if (req.ok) {
                                    setSubmitResult((
                                        <Alert icon={<IconAlertCircle size={16} />} title="Submitted!" color="lime">
                                            Your requested changes were successfully sent off for processing and review. Please wait up to 72 for changes to propagate.
                                        </Alert>
                                    ));
                                } else {
                                    setSubmitResult((
                                        <Alert icon={<IconAlertCircle size={16} />} title="No luck, try again later." color="yellow">
                                            A small problem occured when trying to submit your changes. Please wait at least 5 minutes before retrying.
                                        </Alert>
                                    ));
                                }
                            } catch (e) {
                                setSubmitResult((
                                    <Alert icon={<IconAlertCircle size={16} />} title="Possible Server Issue." color="red">
                                        There was a problem reaching the submission server. Please try again later.
                                    </Alert>
                                ));
                                console.error(e);
                            }

                        }}>
                            Submit Changes
                        </Button>
                    </form>
                    {submitResult}


                </Accordion>
            </ScrollArea>
        </Stack>
    );
}
