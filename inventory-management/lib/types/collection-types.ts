import { Document } from "mongodb"

export type FieldType = 
    "text" | 
    "boolean" | 
    "number" | 
    "float" | 
    "date" | 
    "text_area" | 
    "select_collection" | 
    "select"

export type Field = {
    name: string
    label: string
    type: FieldType
    format?: string
    options?: string | string[]
    table_only?: boolean
}

export type Entity = {
    _id: string
    label: string
    fields: Field[],
    relations: string[]
}

export type AllOptions = {
    [key:string]: Document[]
}
