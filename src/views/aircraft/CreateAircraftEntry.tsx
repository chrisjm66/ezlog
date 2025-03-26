import { ReactElement, useState } from "react"
import Modal from "../../components/Modal"
import NumberInputComponent from "../../components/NumberInputComponent"
import CheckboxComponent from "../../components/CheckboxInputComponent"
import TextInputComponent from "../../components/TextInputComponent"
import { useNavigate } from "react-router-dom"
import useAircraft, { Aircraft, AircraftActions } from "../../hooks/aircraft"

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

const CreateAircraftEntry = (): ReactElement => {
    const aircraft: AircraftActions = useAircraft()
    const navigate = useNavigate()
    const [values, setValues] = useState(INITIAL_STATE)
    const [submitActive, setSubmitActive] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

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

    const closeModal = (): void => {
        setModalOpen(false)
    }

    const submitForm = async(form): Promise<void> => {
        form.preventDefault()
        setSubmitActive(true)
        const response: number = await aircraft.addAircraft(values)
        setSubmitActive(false)

        if (response == 200) {
            aircraft.populateAircraftEntries()
            navigate('/dashboard/aircraft')
        } else {
            setModalOpen(true)
        }
    }

    return (
            <div className="flex flex-col justify-evenly items-center p-2">
                <Modal title='Error Occured' open={modalOpen} onClose={closeModal}>
                    <h1>Unexpected Error Occured</h1>
                </Modal>

                {submitActive ? <Modal title='Status' open={true}><h1>Submitting...</h1></Modal>: ''}
                <h1 className="text-2xl font-bold w-full mb-5">Create Aircraft Entry</h1>

                <form className="w-screen flex flex-wrap gap-y-10 justify-center mb-10" onChange={handleChange} onSubmit={submitForm} id='create'>
                    <div className="flex flex-wrap justify-left border-2 border-ezgray bg-gray-200 p-5 rounded-xl gap-x-5 gap-y-1 w-3/4 h-3/4 relative">
                        {/* general info page */}
                        <h1 className="text-xl font-bold w-full mb-5">GENERAL INFO</h1>

                        <TextInputComponent title='Tail Number' formName='tailNumber' required/>
                        <TextInputComponent title='Type Code' formName='typeCode' required/>
                        <TextInputComponent title='Make' formName='make'/>
                        <TextInputComponent title='Model' formName='model'/>
                        <NumberInputComponent title='Engine Count' formName='numberOfEngines' buttonHidden int/>
                        
                        <div className='flex flex-col w-64 w-40'>
                            <label htmlFor='engineType' className={LABEL_CLASSNAME}>Engine Type</label>
                            <select title='engineType' name='engineType' className={INPUT_CLASSNAME}>
                                <option value='P'>Piston</option>
                                <option value='T'>Turboprop</option>
                                <option value='J'>Jet</option>
                            </select>
                        </div>
                        <TextInputComponent title='Description' formName='description' extended/>

                        <div className="w-full my-1"/>

                        <CheckboxComponent title="TAA" formName="taa"/>
                        <CheckboxComponent title="Complex" formName="complex"/>
                        <CheckboxComponent title="High Performance" formName="highPerformance"/>

                        <div className="w-full my-1"/>

                        <div className='flex flex-col gap-y-2'>
                            <button type='submit' disabled={submitActive} className='border-2 border-ezblue bg-ezblue text-white font-bold text-xl p-2 rounded-md transition-all hover:border-gray-800'>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        
    )
}


export default CreateAircraftEntry