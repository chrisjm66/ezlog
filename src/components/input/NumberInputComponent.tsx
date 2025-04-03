import { ReactElement, useEffect, useRef, useState } from "react"

const NumberInputComponent = ({formName, title, int, buttonHidden, fillValue, value, readOnly}: Props): ReactElement => {
    const [localValue, setLocalValue] = useState<string>('')
    const ref = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (value && value !== 0) {
            setLocalValue(value.toString())
        } else {
            setLocalValue('')
        }
    }, [value])
    
    // so the form component updates
    const triggerChange = () => {
        setLocalValue(fillValue)
        if (ref.current) {
            const event = new Event('change')
            ref.current.form?.dispatchEvent(event)
        }
    }

    // button hidden till i can get it to work
    return (
        <div className="flex flex-col w-40 relative">
            <label htmlFor={formName}>{title}</label>
            <div className="w-full relative">
                <input ref={ref} value={localValue} readOnly={readOnly} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalValue(e.target.value)} name={formName} type='number' placeholder={int ? '0' : '0.0'} step={int ? 1 : .1} min='0'/>
                <button type='button' hidden={true} onClick={triggerChange}  className='absolute right-2 bottom-1 border-1 bg-white text-ezblue border-ezblue px-2 py-1 text-sm'>USE {fillValue}</button>
            </div>
            
        </div>
    )
}

type Props = {
    title: string
    formName: string
    int?: boolean
    buttonHidden?: boolean
    fillValue?: any
    value?: number
    readOnly?: boolean
}
export default NumberInputComponent