import { FC, useEffect, useState } from "react"
import useAircraft, { Aircraft, AircraftActions } from "../../hooks/aircraft"
import CheckboxComponent from "../input/CheckboxInputComponent"
import NumberInputComponent from "../input/NumberInputComponent"
import TextInputComponent from "../input/TextInputComponent"
import EngineOptions from './EngineOptions'
import { toast } from "react-toastify"

const AircraftDisplay: FC<Props> = ({data}: Props) => {
    const aircraft: AircraftActions = useAircraft()
    const [values, setValues] = useState(aircraft.getDefaultAircraftEntry())
    const [submitActive, setSubmitActive] = useState(false)

    const handleChange = (event): void => {
        let eventValue: unknown = event.target.value
        try {
            switch (typeof(aircraft.getDefaultAircraftEntry()[event.target.name])) {
                case "number":
                    // @ts-expect-error event state
                    eventValue = (eventValue == undefined || eventValue === '') ? 0 : parseFloat(eventValue) 
                    break
                case "boolean":
                    eventValue = eventValue !== 'on' ? true : false // somethign to do with updates times or some other bs lol
                    break
                default:
                    break
            }

            const newValues = { ...values, [event.target.name]: eventValue }
            setValues(newValues);
            console.log(newValues)
        } catch (error) {
            console.error(error)
        }
        
        
    };

    const sendCreateOrUpdateRequest = async(form) => {
        if (!submitActive) {
            form.preventDefault()
            setSubmitActive(true)

            if (data?.aircraftId && data?.aircraftId !== -1) {
                await aircraft.updateAircraft(values)
            } else {
                await aircraft.addAircraft(values)
            }

            setSubmitActive(false)
        } else {
            toast.error('Entry already submitting.')
        }
    }

    const sendDeleteRequest = async() => {
        if (!data || !data.aircraftId) {
            return toast.error('Must submit entry before deleting')
        }
        setSubmitActive(true)

        await aircraft.deleteAircraft(data?.aircraftId)

        setSubmitActive(false)
    }

    useEffect(() => {
        if (data) {
            setValues(data)
        }
    }, [data, setValues])

    if (!data) {
        return <h2>No Aircraft Data</h2>
    }

    return (
            <div className="form-container">
                <form className="w-full flex flex-wrap gap-y-10 justify-center mb-10" onChange={handleChange} onSubmit={sendCreateOrUpdateRequest} id='create'>
                    <div className="flex flex-wrap justify-left border-2 border-ezgray bg-gray-200 p-5 rounded-xl gap-x-5 gap-y-1 w-3/4 h-3/4 relative">
                        {/* general info page */}
                        <h1 className="text-xl font-bold w-full mb-5">GENERAL INFO</h1>

                        <TextInputComponent value={data.tailNumber} forceUpperCase title='Tail Number' formName='tailNumber' required />
                        <TextInputComponent value={data.typeCode} forceUpperCase title='Type Code' formName='typeCode' required/>
                        <TextInputComponent value={data.make} title='Make' formName='make'/>
                        <TextInputComponent value={data.model} title='Model' formName='model'/>
                        <NumberInputComponent value={data.numberOfEngines}title='Engine Count' formName='numberOfEngines' buttonHidden int/>
                        
                        <EngineOptions data={data}/>

                        <TextInputComponent title='Description' formName='description' value={data.description} extended/>

                        <div className="w-full my-1"/>

                        <CheckboxComponent value={data.taa} title="TAA" formName="taa"/>
                        <CheckboxComponent value={data.complex} title="Complex" formName="complex"/>
                        <CheckboxComponent value={data.highPerformance} title="High Performance" formName="highPerformance"/>

                        <div className="w-full my-1"/>

                        <div className='flex flex-row gap-x-2'>
                            <button type='submit' disabled={submitActive}>Submit Changes</button>
                            {(data.aircraftId && data.aircraftId != -1) ? <button type='button' onClick={sendDeleteRequest} disabled={submitActive} className='bg-ezred'>Delete</button> : ''}
                        </div>
                    </div>
                </form>
            </div>
        
    )
}

type Props = {
    data?: Aircraft
}

export default AircraftDisplay