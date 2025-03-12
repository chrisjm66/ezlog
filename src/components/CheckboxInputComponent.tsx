import { ReactElement } from "react"

const LABEL_CLASSNAME = 'text-lg mb-2 w-full'
const CheckboxComponent = ({formName, title, readOnly, value}: Props): ReactElement => {
    return (
        <div className={"flex flex-col mr-5"}>
            <label htmlFor={formName?.toLowerCase()} className={LABEL_CLASSNAME}>{title}</label>
            <input name={formName?.toLowerCase()} disabled={readOnly} checked={value} type="checkbox" className={'rounded-sm border-1 text-xl checked:accent-ezblue w-8 h-8 transition-colors'}/>
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