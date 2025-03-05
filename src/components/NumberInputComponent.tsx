import { ReactElement, useState } from "react"

const INPUT_CLASSNAME = 'py-1 px-2 w-full bg-white rounded-sm border-1 font-bold text-xl text-ezblue'
const LABEL_CLASSNAME = 'text-xl mb-1'

const InputComponent = ({name, int, buttonHidden, fillValue}: Props): ReactElement => {
    const [inputEmpty, setInputEmpty] = useState(true)

    const handleChange = (e) => {
        if (e.target.value === '') {
            setInputEmpty(true)
        } else {
            setInputEmpty(false)
        }
    }

    const updateInputValue = (e) => {
        e.preventDefault()
        const input = e.target.previousElementSibling
        input.value = fillValue
        handleChange({target: input})
    }
    return (
        <div className="flex flex-col w-40 relative">
            <label htmlFor={name} className={LABEL_CLASSNAME}>{name}</label>
            <div className="w-full relative">
                <input onChange={handleChange} name={name.toLowerCase()} type='number' placeholder={int ? '0' : '0.0'} step={int ? 1 : .1} min='0' className={INPUT_CLASSNAME}/>
                <button onClick={updateInputValue} hidden={buttonHidden || !inputEmpty} className='absolute right-2 bottom-1 border-1 text-ezblue border-ezblue px-2 py-1 text-sm'>USE {fillValue}</button>
            </div>
            
        </div>
        
    )
}

type Props = {
    name: string
    int?: boolean
    buttonHidden?: boolean
    fillValue?: any
}
export default InputComponent