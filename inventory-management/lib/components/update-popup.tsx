import React from 'react';

type FieldType = "text" | "boolean" | "number" | "float" | "date" | "text_area" | "select_collection" | "select"
type Field = {
    name: string
    label: string
    type: FieldType
    format?: string
    options?: string | string[]
    table_only?: boolean
}

type UpdateModelProps = {
    name: string
    buttonMessage: string,
    fields: Field[]
}

export const UpdateModel: React.FC<UpdateModelProps> = ({
    name, 
    buttonMessage,
    fields
}) => {
    // Add dialog showing and closing
    // https://blog.logrocket.com/creating-reusable-pop-up-modal-react/

    const createField = (fieldData: Field) => { 
        const {table_only, label, format, options, ...field} = fieldData
        const fieldElements = {
            boolean: {...field, value: field.name, checked: false},
            float: {...field, step: 0.01},
            default: field
        };

        const elementIndex = field.type in fieldElements ? field.type : "default"
        // @ts-ignore
        return <input {...fieldElements[elementIndex]} />
    } 

    return (
        <>
            <button id={`open-modal-${name}`}>{buttonMessage}</button>
            <dialog id={`modal-${name}`} className="modal">
                <button 
                    id={`close-button-${name}`} 
                    className="modal-close-button"
                >
                    Close
                </button>
                <form>
                    {fields.filter(field => !field.table_only).map((field) => (
                        createField(field)
                    ))}
                </form>
            </dialog>
        </>
    )
}
