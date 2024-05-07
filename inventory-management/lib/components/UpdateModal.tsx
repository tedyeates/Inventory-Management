import React, { ReactElement, useContext} from 'react';

import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput, NumberInput, Select, Textarea } from '@mantine/core';

import { Field } from '../types/collection-types'
import { FormContext, FormProvider } from 'lib/context/FormProvider';
import { SelectCollection } from './SelectCollection';
import { DateInput } from '@mantine/dates';

type FieldProps = {
    name: string
    label: string
    type: string
    table_only?: boolean
    format?: string
    options?: string | string[]
}

type HTMLFieldTypes = {
    select_collection: ReactElement
    text: ReactElement
    date: ReactElement
    float: ReactElement
    select: ReactElement
}

const HTMLField: React.FC<FieldProps> = ({label, format, name, type, options}) => {
    const { form } = useContext(FormContext)

    console.log(type)
    console.log(label)

    const getField = (fieldType: keyof HTMLFieldTypes) => {
        const commonAttributes = {
            key: form?.key(label),
            label,
            name,
        }

        const field = {
            select_collection: () => (
                <SelectCollection 
                    name={name}
                    label={label}
                    collection={options as string} 
                />
            ),
            text: () => (
                <TextInput 
                    {...form?.getInputProps(label)} 
                    {...commonAttributes}
                />
            ),
            text_area: () => (
                <Textarea
                    {...form?.getInputProps(label)} 
                    {...commonAttributes}
                />
            ),
            date: () => (
                <DateInput
                    {...form?.getInputProps(label)} 
                    {...commonAttributes}
                    valueFormat="DD/MM/YYYY"
                    clearable 
                />
            ),
            float: () => (
                <NumberInput 
                    {...form?.getInputProps(label)} 
                    {...commonAttributes}
                    decimalScale={2}
                    step={0.01}
                />
            ),
            select: () => (
                <Select
                    {...form?.getInputProps(label)} 
                    {...commonAttributes}
                    data={(options as string[]).map((option, index) => (
                        {value: index.toString(), label: option}
                    ))}
                />
            )
        }

        return field[fieldType]()
    }

    return (
        <div>
            {getField(type as keyof HTMLFieldTypes)}
        </div>
    )
}

type UpdateModelProps = {
    name: string
    buttonMessage: string,
    fields: Field[]
}

export const UpdateModal: React.FC<UpdateModelProps> = ({
    name, 
    buttonMessage,
    fields
}) => {
    const [opened, { open, close }] = useDisclosure(false)
    // can use form for validation https://mantine.dev/form/use-form/
    return (
        <>
            <Button variant="outline" onClick={open}>{buttonMessage}</Button>
            <Modal opened={opened} onClose={close} title={buttonMessage} id={`modal-${name}`} className="modal"> 
                <FormProvider>
                    <form>
                        {fields.filter(field => !field.table_only).map((field) => (
                            <HTMLField {...field} key={field.name} />
                        ))}
                    </form>  
                </FormProvider>
            </Modal>
        </>
    )
}
