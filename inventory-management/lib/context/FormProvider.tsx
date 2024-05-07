import { UseFormReturnType, useForm } from "@mantine/form"
import React, { ReactNode, createContext } from "react"

type FormContextType = {
    form: UseFormReturnType<Record<string, any>, (values: Record<string, any>) => Record<string, any>> | undefined
}

export const FormContext = createContext<FormContextType>({
    form: undefined
})


export const FormProvider = ({children}: {children: ReactNode}) => {

    const form = useForm({
        mode: 'uncontrolled'
    })

    return (
        <FormContext.Provider value = {{ form }}>
            {children}
        </FormContext.Provider>
    )
}