import { ReactElement } from "react"

const LABEL_CLASSNAME = 'text-xl mb-2'
const TextInputComponent = ({name, maxLength, forceUpperCase, extended, bold}: Props): ReactElement => {
    return (
        <div className={"flex flex-col" + (extended ? ' w-64' : ' w-40')}>
            <label htmlFor={name.toLowerCase()} className={LABEL_CLASSNAME}>{name}</label>
            <input name={name.toLowerCase()} type="text" className={'px-2 py-1 w-full bg-white rounded-sm border-1 text-xl text-ezblue ' + (forceUpperCase ? 'uppercase' : ' ') + (bold ? ' font-bold' : '')} maxLength={maxLength}/>
        </div>
    )
}


type Props = {
    name: string
    maxLength?: number
    forceUpperCase?: boolean
    extended?: boolean
    bold?: boolean
}
export default TextInputComponent