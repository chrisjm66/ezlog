import { ReactElement } from "react"

const LABEL_CLASSNAME = 'text-xl mb-2'
const TextInputComponent = ({formName, title, maxLength, forceUpperCase, extended, bold, defaultValue, required}: Props): ReactElement => {
    return (
        <div className={"flex flex-col" + (extended ? ' w-64' : ' w-40')}>
            <label htmlFor={formName?.toLowerCase()} className={LABEL_CLASSNAME}>{title}</label>
            <input name={formName} defaultValue={defaultValue} type="text" required={required ? true : false} className={'px-2 py-1 w-full bg-white rounded-sm border-1 text-xl text-ezblue ' + (forceUpperCase ? 'uppercase' : ' ') + (bold ? ' font-bold' : '')} maxLength={maxLength}/>
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