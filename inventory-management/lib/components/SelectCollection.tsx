import { useState, useRef, useContext, useEffect } from "react"
import { Loader, Select } from '@mantine/core'
import { FormContext } from "lib/context/FormProvider"

type SelectFieldProps = {
    name: string
    collection: string
    label: string
}

type Suggestions = Document & {
    _id: string
    label: string
}

export const SelectCollection: React.FC<SelectFieldProps> = ({name, collection, label}) => {
    const timeoutRef = useRef<number>(-1)
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [suggestions, setSuggestions] = useState<Suggestions[]>([])
    const { form } = useContext(FormContext)


    const handleSearchChange = (search?: string) => {
        window.clearTimeout(timeoutRef.current)
        setValue(search ?? '')
        console.log("searching")
        console.log(search)

        setLoading(true)
        timeoutRef.current = window.setTimeout(async () => {
            let url = `/api/suggestions/${collection}/`
            if (search !== undefined && search !== '') {
                url += `${search}/`
            }

            const response = await fetch(url)
            const results = await response.json()
            setLoading(false)
            setSuggestions(results.suggestions)
        }, 500)
    }

    useEffect(() => {
        if (!loading) {
            handleSearchChange()
        }
    }, [])


    return (
        <Select 
            {...form?.getInputProps(label)}
            searchable
            data={suggestions.map((suggestion) => ({value: suggestion._id, label: suggestion.label}))}
            onSearchChange={handleSearchChange}
            searchValue={value}
            onChange={(value, option) => {form?.setFieldValue(label, value)}}
            rightSection={loading ? <Loader size="1rem" /> : null}   
            label={label}
            name={name}
            key={form?.key(label)}
        />
    )
}