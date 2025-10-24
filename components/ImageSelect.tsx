import { ComboboxProps, Group, Select, SelectProps, Text, ThemeIcon } from '@mantine/core';
import { IconQuestionMark } from '@tabler/icons-react';
import { Dispatch, FormEventHandler, forwardRef, SetStateAction } from 'react';
import { useState } from 'react';
import { Combobox, Input, InputBase, useCombobox, ScrollArea } from '@mantine/core';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    image: string;
    value: string;
    label: string;
}

function SelectOption({ image, value, label }: ItemProps) {
    return (
        <Group wrap="nowrap">
            {image ? (
                <img src={image} alt={label} width={25} />
            ) : (
                <ThemeIcon w={25} color="gray" radius="xl">
                    <IconQuestionMark />
                </ThemeIcon>
            )}
            <Text size="sm">{label}</Text>
        </Group>
    );
}

interface ImageSelectProps extends React.ComponentPropsWithoutRef<'div'> {
    data: ItemProps[]
    defaultOption?: number
    searchable: boolean // TODO: implement searchable from Select
    value: string // TODO: use this value when passed
    nothingFoundMessage: string // TODO: dependant on searchable
    placeholder: string // TODO: also dependant on searchable
    onChangeCb: Dispatch<SetStateAction<string>>
}

export default function ImageSelect({ data, defaultOption, onChangeCb }: ImageSelectProps) {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [value, setValue] = useState<string | null>(data[defaultOption ?? 0].value);
    const selectedOption = data.find((item) => item.value === value);

    const options = data.map((item) => (
        <Combobox.Option value={item.value} key={item.value}>
            <SelectOption {...item} />
        </Combobox.Option>
    ));

    return (
        <Combobox
            width={320}
            store={combobox}
            withinPortal={false}
            onOptionSubmit={(val) => {
                setValue(val);
                combobox.closeDropdown();
                onChangeCb(val);
            }}
        >
            <Combobox.Target>
                <InputBase
                    component="button"
                    type="button"
                    pointer
                    rightSection={<Combobox.Chevron />}
                    onClick={() => combobox.toggleDropdown()}
                    rightSectionPointerEvents="none"
                    multiline
                >
                    {selectedOption ? (
                        <SelectOption {...selectedOption} />
                    ) : (
                        <Input.Placeholder>Pick value</Input.Placeholder>
                    )}
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>
                    <ScrollArea.Autosize type='scroll' mah={400}>{options}</ScrollArea.Autosize>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}
