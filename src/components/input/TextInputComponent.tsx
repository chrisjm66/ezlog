import { ReactElement, useEffect, useState } from "react"

const TextInputComponent = ({formName, title, maxLength, forceUpperCase, extended, bold, value, required, readOnly}: Props): ReactElement => {
    const [localValue, setLocalValue] = useState<string | undefined>('')

    const handleChange = (e) => {
        setLocalValue(e.target.value)
    }

    useEffect(() => {
        if (value) {
            setLocalValue(value)
        } else {
            setLocalValue('')
        }
    }, [value])

    return (
        <div className={"flex flex-col" + (extended ? ' w-64' : ' w-40')}>
            <label htmlFor={formName?.toLowerCase()}>{title}</label>
            <input title={formName} name={formName} readOnly={readOnly} onChange={handleChange} value={localValue} type="text" required={required ? true : false} className={(forceUpperCase ? 'uppercase' : ' ') + (bold ? ' font-bold' : '')} maxLength={maxLength}/>
        </div>
    )
}


type Props = {
    title: string
    formName?: string
    maxLength?: number
    forceUpperCase?: boolean
    extended?: boolean
    bold?: boolean
    value? :string
    required?: boolean
    readOnly?: boolean
}
export default TextInputComponent