import { ReactElement, useEffect, useState } from "react"
import type { Aircraft, AircraftActions } from "../hooks/aircraft"
import Modal from "../components/Modal"
import NumberInputComponent from "../components/NumberInputComponent"
import TextInputComponent from "../components/TextInputComponent"
import CheckboxComponent from "../components/CheckboxInputComponent"
import { useNavigate, useParams } from "react-router-dom"
import useAircraft from "../hooks/aircraft"
import { NavLink } from "react-router-dom"

const INPUT_CLASSNAME = 'px-2 py-1 w-full bg-white rounded-sm border-1 font-bold text-xl text-ezblue'
const LABEL_CLASSNAME = 'text-xl mb-2'
const INITIAL_STATE: Aircraft = {
    aircraftId: -1,
    tailNumber: '',
    description: '',
    make: '',
    typeCode: '',
    model: '',
    numberOfEngines: 0,
    engineType: '',
    taa: false,
    complex: false,
    highPerformance: false
}

const EditLogbookEntry = (): ReactElement => {
    const aircraft: AircraftActions = useAircraft()
    const {aircraftId} = useParams()
    const navigate = useNavigate()
    const [values, setValues] = useState<Aircraft>(INITIAL_STATE)
    const [submitActive, setSubmitActive] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    // onChange
    
    const handleChange = (event): void => {
        let eventValue: unknown = event.target.value
        try {
            switch (typeof(INITIAL_STATE[event.target.name])) {
                case "number":
                    // @ts-expect-error event state
                    eventValue = (eventValue == undefined || eventValue === '') ? 0 : parseFloat(eventValue) 
                    break
                case "boolean":
                    eventValue = eventValue === 'on' ? true : false
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

    useEffect(() => {
        if (aircraftId) {
            const entry: Aircraft | undefined = aircraft.getAircraft(parseInt(aircraftId))
            
            if (entry) {
                setValues(entry)
            }
        }
    }, [])

    const closeModal = (): void => {
        setModalOpen(false)
    }

    const submitForm = async(form): Promise<void> => {
        form.preventDefault()
        setSubmitActive(true)
        const response: number = await aircraft.updateAircraft(values)
        setSubmitActive(false)

        if (response == 200) {
            aircraft.populateAircraftEntries()
            navigate('/dashboard/aircraft')
        }
    }

    if (!values.aircraftId) {
        return (
            <div className='p-5'>
                <h2 className='font-bold'>Error: Entry does not exist</h2>
                <NavLink className='text-ezblue' to='/dashboard/aircraft'>Return to aircraft list</NavLink>
            </div>
            
        )
    }
    return (
            <div className="flex flex-col justify-evenly items-center p-2">
                <Modal title='Error Occured' open={modalOpen} onClose={closeModal}>
                    <h1>Unexpected Error Occured</h1>
                </Modal>

                {submitActive ? <Modal title='Status' open={true}><h1>Submitting...</h1></Modal>: ''}

                <h1 className="text-2xl font-bold w-full mb-5">Edit Aircraft Entry</h1>

                <form className="w-screen flex flex-wrap gap-y-10 justify-center mb-10" onChange={handleChange} onSubmit={submitForm} id='create'>
                    <div className="flex flex-wrap justify-left border-2 border-ezgray bg-gray-200 p-5 rounded-xl gap-x-5 gap-y-1 w-3/4 h-3/4 relative">
                        {/* general info page */}
                        <h1 className="text-xl font-bold w-full mb-5">GENERAL INFO</h1>

                        <TextInputComponent defaultValue={values.tailNumber} title='Tail Number' formName='tailNumber' required/>
                        <TextInputComponent defaultValue={values.typeCode} title='Type Code' formName='typeCode' required/>
                        <TextInputComponent defaultValue={values.make ? values.make : ''} title='Make' formName='make'/>
                        <TextInputComponent defaultValue={values.model ? values.model : ''} title='Model' formName='model'/>
                        <NumberInputComponent setValue={values.numberOfEngines} title='Engine Count' formName='numberOfEngines' buttonHidden int/>
                        
                        <div className='flex flex-col w-64'>
                            <label htmlFor='engineType' className={LABEL_CLASSNAME}>Engine Type</label>
                            <select name='engineType' defaultValue={values.engineType} className={INPUT_CLASSNAME}>
                                <option value='P'>Piston</option>
                                <option value='T'>Turboprop</option>
                                <option value='J'>Jet</option>
                            </select>
                        </div>
                        <TextInputComponent defaultValue={values.description ? values.description : ''} title='Description' formName='description' extended/>

                        <div className="w-full my-1"/>

                        <CheckboxComponent defaultValue={values.taa} title="TAA" formName="taa"/>
                        <CheckboxComponent defaultValue={values.complex} title="Complex" formName="complex"/>
                        <CheckboxComponent defaultValue={values.highPerformance} title="High Performance" formName="highPerformance"/>

                        <div className="w-full my-1"/>

                        <div className='flex flex-col gap-y-2'>
                            <button type='submit' disabled={submitActive} className='border-2 border-ezblue bg-ezblue text-white font-bold text-xl p-2 rounded-md transition-all hover:border-gray-800'>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        
    )
}


export default EditLogbookEntry