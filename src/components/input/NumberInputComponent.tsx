import { ReactElement, useEffect, useRef, useState } from "react"

const NumberInputComponent = ({formName, title, int, buttonHidden, fillValue, value, readOnly}: Props): ReactElement => {
    const [localValue, setLocalValue] = useState<string>('')
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [inputEmpty, setInputEmpty] = useState<boolean>(false)

    const handleChange = () => {
        setLocalValue(inputRef.current?.value || '')
        if (inputRef.current?.value === '') {
            setInputEmpty(true)
        } else {
            setInputEmpty(false)
        }
    }

    const updateInputValue = (e) => {
        e.preventDefault()
        setLocalValue(fillValue)
        handleChange()
    }

    useEffect(() => {
        handleChange()
    })
    
    useEffect(() => {
        if (value) {
            setLocalValue(value.toString())
        } else {
            setLocalValue('')
        }
    }, [value])
    
    return (
        <div className="flex flex-col w-40 relative">
            <label htmlFor={formName}>{title}</label>
            <div className="w-full relative">
                <input ref={inputRef} value={localValue ? localValue : undefined} readOnly={readOnly} onChange={handleChange} name={formName} type='number' placeholder={int ? '0' : '0.0'} step={int ? 1 : .1} min='0'/>
                {inputRef.current?.value === ''}
                <button onClick={updateInputValue} hidden={buttonHidden || !inputEmpty || readOnly} className='absolute right-2 bottom-1 border-1 bg-white text-ezblue border-ezblue px-2 py-1 text-sm'>USE {fillValue}</button>
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