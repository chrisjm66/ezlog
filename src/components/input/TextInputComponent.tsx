import { ReactElement } from "react"

const TextInputComponent = ({formName, title, maxLength, forceUpperCase, extended, bold, value, required, readOnly}: Props): ReactElement => {
    return (
        <div className={"flex flex-col" + (extended ? ' w-64' : ' w-40')}>
            <label htmlFor={formName?.toLowerCase()}>{title}</label>
            <input title={formName} name={formName} readOnly={readOnly} defaultValue={value} type="text" required={required ? true : false} className={(forceUpperCase ? 'uppercase' : ' ') + (bold ? ' font-bold' : '')} maxLength={maxLength}/>
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