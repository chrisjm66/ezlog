import { ReactElement, useEffect, useState } from "react"
import type { LogbookEntry } from "../../hooks/logbook"
import Modal from "../../components/modal/Modal"
import NumberInputComponent from "../../components/input/NumberInputComponent"
import TextInputComponent from "../../components/input/TextInputComponent"
import CheckboxComponent from "../../components/input/CheckboxInputComponent"
import { useNavigate, useParams } from "react-router-dom"
import useLogbook from "../../hooks/logbook"
import { NavLink } from "react-router-dom"
import DisplayComponent from "../../components/input/FormDisplayComponent"
import useAircraft, { AircraftActions } from "../../hooks/aircraft"

const INPUT_CLASSNAME = 'px-2 py-1 w-full bg-white rounded-sm border-1 font-bold text-xl text-ezblue'
const LABEL_CLASSNAME = 'text-xl mb-2'
const INITIAL_STATE: LogbookEntry = {
            date: new Date().toISOString(),
            entryId: undefined,
            aircraftId: -1,
            totalTime: 0,
            pic: 0,
            sic: 0,
            solo: 0,
            crossCountry: 0,
            simImc: 0,
            actImc: 0,
            night: 0,
            dayLandings: 0,
            nightLandings: 0,
            totalLandings: 0,
            holding: false,
            approaches: 0,
            dualGiven: 0,
            dualRecieved: 0,
            route: '',
            to: "",
            from: "",
            remarks: "",
            approachNames: "",
            intercepting: false,
            ipc: false,
            checkride: false,
            flightReview: false
}

const EditLogbookEntry = (): ReactElement => {
    const logbook = useLogbook()
    const {entryId} = useParams()
    const navigate = useNavigate()
    const [values, setValues] = useState<LogbookEntry>(INITIAL_STATE)
    const [submitActive, setSubmitActive] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const aircraft: AircraftActions = useAircraft()
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
        if (entryId) {
            const entry: LogbookEntry | undefined = logbook.getLogbookEntry(parseInt(entryId))
            
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
        const response: number = await logbook.updateEntry(values)
        setSubmitActive(false)

        if (response == 200) {
            logbook.populateLogbookEntries()
            navigate('/dashboard/logbook')
        }
    }

    if (!values.entryId) {
        return (
            <div className='p-5'>
                <h2 className='font-bold'>Error: Entry does not exist</h2>
                <NavLink className='text-ezblue' to='/dashboard/logbook'>Return to logbook</NavLink>
            </div>
            
        )
    }
    return (
            <div className="flex flex-col justify-evenly items-center p-2">
                <Modal title='Error Occured' open={modalOpen} onClose={closeModal}>
                    <h1>Unexpected Error Occured</h1>
                </Modal>

                {submitActive ? <Modal title='Status' open={true}><h1>Submitting...</h1></Modal>: ''}

                <h1 className="text-2xl font-bold w-full mb-5">Edit Logbook Entry</h1>

                <form className="w-screen flex flex-wrap gap-y-10 justify-center mb-10" onChange={handleChange} onSubmit={submitForm} id='create'>
                    <div className="flex flex-wrap justify-left border-2 border-ezgray bg-gray-200 p-5 rounded-xl gap-x-5 gap-y-1 w-3/4 h-3/4">
                        {/* general info page */}
                        <h1 className="text-xl font-bold w-full mb-5">GENERAL INFO</h1>

                        <div className="flex flex-col w-40">
                            <label className={LABEL_CLASSNAME}>Date</label>
                            <input required name='date' type="date" defaultValue={values.date.slice(0,10)} className={INPUT_CLASSNAME}/>
                        </div>

                        <DisplayComponent title='Aircraft' value={aircraft.getAircraft(values.aircraftId)?.tailNumber}/>
                        
                        
                        
                        <TextInputComponent defaultValue={values.from} bold forceUpperCase title='From' formName='from' maxLength={4}/>
                        <TextInputComponent defaultValue={values.to} bold forceUpperCase title='To' formName='to' maxLength={4}/>
                        <TextInputComponent defaultValue={values.route} extended title='Route' formName='route'/>

                        <div className="w-full my-1"/>

                        <NumberInputComponent title='PIC' formName='pic' setValue={values.pic} fillValue={values.totalTime}/>
                        <NumberInputComponent title='SIC' formName='sic' setValue={values.sic} fillValue={values.totalTime}/>
                        <NumberInputComponent title='Night' formName='night' setValue={values.night} fillValue={values.totalTime}/>
                        <NumberInputComponent title='Solo' formName='solo' setValue={values.solo} fillValue={values.totalTime}/>
                        <NumberInputComponent title='Cross Country' formName='crossCountry' setValue={values.crossCountry} fillValue={values.totalTime}/>
                        <NumberInputComponent title='Dual Recieved' formName='dualRecieved' setValue={values.dualRecieved} fillValue={values.totalTime}/>
                        <NumberInputComponent title='Dual Given' formName='dualGiven' setValue={values.dualGiven} fillValue={values.totalTime}/>
                        <NumberInputComponent int title='Day Landings' formName='dayLandings'  setValue={values.dayLandings} fillValue={values.totalLandings}/>
                        <NumberInputComponent int title='Night Landings' formName='nightLandings' setValue={values.nightLandings} fillValue={values.totalLandings}/>
                        <NumberInputComponent int title='Total Landings' formName='totalLandings' setValue={values.totalLandings} fillValue={values.dayLandings + values.totalLandings}/>

                        <div className="w-full my-1"/>

                        <NumberInputComponent buttonHidden title='Total Time' formName='totalTime' setValue={values.totalTime}/>
                    </div>


                    {/* instrument info page */}
                    <div className="flex flex-wrap justify-left border-2 border-ezgray bg-gray-200 p-5 rounded-xl gap-x-5 gap-y-2 w-3/4 h-3/4">
                        <h1 className="text-xl font-bold w-full mb-2">INSTRUMENT</h1>
            
                        <NumberInputComponent title='Simulated IMC' buttonHidden formName='simImc' setValue={values.simImc}/>
                        <NumberInputComponent title='Actual IMC' buttonHidden formName='actImc' setValue={values.actImc}/>
                        <NumberInputComponent int buttonHidden title='Approaches' formName='approaches' setValue={values.approaches}/>
                        <TextInputComponent extended title='Approach Names' formName='approachNames' defaultValue={values.approachNames}/>

                        <div className="w-full my-1"/>

                        <CheckboxComponent title='Holding' formName='holding' value={values.holding}/>
                        <CheckboxComponent title='Intercepting and Tracking Courses' formName='intercepting' value={values.intercepting}/>
                    </div>

                    {/* training info page */}
                    <div className="flex flex-wrap justify-left border-2 border-ezgray bg-gray-200 p-5 rounded-xl gap-x-5 w-3/4 h-3/4 relative">
                        <h1 className="text-xl font-bold w-full mb-2">TRAINING</h1>
                        <TextInputComponent extended title='Instructor Email'/>

                        <div className="w-full my-2"/>

                        <p className='italic text-lg w-96'>I give my permission to share this logbook entry and my personal information to this user.</p>
                        <div className="w-full"/>
                        <CheckboxComponent title=''/>

                        <div className='absolute right-5 bottom-5 flex flex-col gap-y-2'>
                            <button className='border-2 border-ezred bg-ezred text-white font-bold text-xl p-2 rounded-md transition-all hover:border-gray-800'>Cancel Request</button>
                            <button className='border-2 border-ezblue bg-ezblue text-white font-bold text-xl p-2 rounded-md transition-all hover:border-gray-800'>Request Signature</button>
                        </div>
                    </div>

                    {/* remarks info page */}
                    <div className="flex flex-wrap justify-left border-2 border-ezgray bg-gray-200 p-5 rounded-xl gap-x-5 w-3/4 h-3/4 relative">
                        <h1 className="text-xl font-bold w-full mb-2">REMARKS</h1>

                        <div className="w-1/3 ml-10">
                            <h2 className='text-lg font-bold mb-2'>Flight Tags</h2>
                            <div className='flex justify-left gap-x-12 w-full items-end'>
                                <CheckboxComponent title="Checkride" formName='checkride' value={values.checkride}/>
                                <CheckboxComponent title="IPC" formName='ipc' value={values.ipc}/>
                                <CheckboxComponent title="Flight Review" formName='flightReview' value={values.flightReview}/>
                            </div>
                        </div>
                       
                        

                        <div className="w-full my-2"/>
                        <div className="w-1/3 ml-10">
                            <label htmlFor='remarks' className={LABEL_CLASSNAME}>Remarks</label>
                            <textarea name='remarks' placeholder="Enter remarks here" className='mt-2 px-2 py-1 w-120 h-56 bg-white rounded-sm border-1 text-md text-ezblue resize-none' defaultValue={values.remarks}></textarea>
                        </div>
                        

                        <div className='absolute right-5 bottom-5 flex flex-col gap-y-2'>
                            <button className='border-2 border-ezgray bg-ezgray text-white font-bold text-xl p-2 rounded-md transition-all hover:border-gray-800'>Verify Times</button>
                            <button disabled={submitActive} className='border-2 border-amber-500 bg-amber-500 text-white font-bold text-xl p-2 rounded-md transition-all hover:border-gray-800'>Update</button>
                        </div>
                    </div>
                </form>
            </div>
        
    )
}


export default EditLogbookEntry