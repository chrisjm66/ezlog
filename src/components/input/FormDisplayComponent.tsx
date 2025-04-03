import { ReactElement } from "react"
const INPUT_CLASSNAME = 'px-2 py-1 w-full min-h-10 bg-white rounded-sm border-1 font-bold text-xl text-ezblue'
const LABEL_CLASSNAME = 'text-xl mb-2'

const DisplayComponent = ({title, value, extended} : Props): ReactElement => {
    return (
        <div className={`flex flex-col ${extended ? 'w-64' : 'w-40'}`}>
            <label className={LABEL_CLASSNAME}>{title}</label>
            <label className={INPUT_CLASSNAME}>{value}</label>
        </div>
        
    )
}

type Props = {
    title: string
    value?: any
    extended?: boolean
}

export default DisplayComponent