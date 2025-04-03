import { ReactElement, useEffect, useState } from "react"

const CheckboxComponent = ({formName, title, readOnly, value}: Props): ReactElement => {
    const [localValue, setLocalValue] = useState<boolean>(false)

    const handleChange = () => {
        setLocalValue(!localValue)
    }

    useEffect(() => {
        setLocalValue(value || false)
    }, [value, setLocalValue])

    return (
        <div className={"flex flex-col mr-5"}>
            <label htmlFor={formName?.toLowerCase()}>{title}</label>
            <input title='formName' name={formName} disabled={readOnly} value={localValue ? 'on' : 'off'} checked={localValue} onChange={handleChange} type="checkbox" className={'rounded-sm border-1 text-xl checked:accent-ezblue w-8 h-8 transition-colors'}/>
        </div>
    )
}


type Props = {
    title: string
    formName?: string
    readOnly?: boolean
    value?: boolean
}

export default CheckboxComponent