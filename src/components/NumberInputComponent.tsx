import { ReactElement, useEffect, useRef, useState } from "react"

const INPUT_CLASSNAME = 'py-1 px-2 w-full bg-white rounded-sm border-1 font-bold text-xl text-ezblue'
const LABEL_CLASSNAME = 'text-xl mb-1'

const InputComponent = ({formName, title, int, buttonHidden, fillValue, setValue}: Props): ReactElement => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [inputEmpty, setInputEmpty] = useState<boolean>(false)

    const handleChange = () => {
        if (inputRef.current?.value === '') {
            setInputEmpty(true)
        } else {
            setInputEmpty(false)
        }
    }

    const updateInputValue = (e) => {
        e.preventDefault()
        const input = e.target.previousElementSibling
        input.value = fillValue
        handleChange()
    }

    useEffect(() => {
        handleChange()
    })
    
    return (
        <div className="flex flex-col w-40 relative">
            <label htmlFor={formName} className={LABEL_CLASSNAME}>{title}</label>
            <div className="w-full relative">
                <input ref={inputRef} defaultValue={setValue ? setValue : ''} onChange={handleChange} name={formName} type='number' placeholder={int ? '0' : '0.0'} step={int ? 1 : .1} min='0' className={INPUT_CLASSNAME}/>
                {inputRef.current?.value === ''}
                <button onClick={updateInputValue} hidden={buttonHidden || !inputEmpty} className='absolute right-2 bottom-1 border-1 text-ezblue border-ezblue px-2 py-1 text-sm'>USE {fillValue}</button>
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
    setValue?: number
}
export default InputComponent