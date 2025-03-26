import { ReactElement } from "react"

const CheckboxComponent = ({formName, title, readOnly, value}: Props): ReactElement => {
    return (
        <div className={"flex flex-col mr-5"}>
            <label htmlFor={formName?.toLowerCase()}>{title}</label>
            <input name={formName} disabled={readOnly} defaultChecked={value ? true : false} type="checkbox" className={'rounded-sm border-1 text-xl checked:accent-ezblue w-8 h-8 transition-colors'}/>
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