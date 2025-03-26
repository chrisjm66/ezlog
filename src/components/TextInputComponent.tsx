import { ReactElement } from "react"

const TextInputComponent = ({formName, title, maxLength, forceUpperCase, extended, bold, defaultValue, required}: Props): ReactElement => {
    return (
        <div className={"flex flex-col" + (extended ? ' w-64' : ' w-40')}>
            <label htmlFor={formName?.toLowerCase()}>{title}</label>
            <input name={formName} defaultValue={defaultValue} type="text" required={required ? true : false} className={(forceUpperCase ? 'uppercase' : ' ') + (bold ? ' font-bold' : '')} maxLength={maxLength}/>
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
    defaultValue? :string
    required?: boolean
}
export default TextInputComponent