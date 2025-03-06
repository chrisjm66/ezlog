import { ReactElement } from "react"
import NumberInputComponent from "../components/NumberInputComponent"
import TextInputComponent from "../components/TextInputComponent"
import CheckboxComponent from "../components/CheckboxInputComponent"

const INPUT_CLASSNAME = 'px-2 py-1 w-full bg-white rounded-sm border-1 font-bold text-xl text-ezblue'
const LABEL_CLASSNAME = 'text-xl mb-2'

const CreateLogbookEntry = (): ReactElement => {
    

    const handleChange = () => {

    }

    return (
            <div className="flex flex-col justify-evenly items-center p-2">
                <h1 className="text-2xl font-bold w-full mb-5">Create Logbook Entry</h1>

                <form className="w-screen flex flex-wrap gap-y-10 justify-center mb-10" onChange={handleChange}>
                    <div className="flex flex-wrap justify-left border-2 border-ezgray bg-gray-200 p-5 rounded-xl gap-x-5 gap-y-1 w-3/4 h-3/4">
                        {/* general info page */}
                        <h1 className="text-xl font-bold w-full mb-5">GENERAL INFO</h1>

                        <div className="flex flex-col w-40">
                            <label className={LABEL_CLASSNAME}>Date</label>
                            <input name='date' type="date" placeholder="today" className={INPUT_CLASSNAME}/>
                        </div>

                        <div className="flex flex-col w-64">
                            <label className={LABEL_CLASSNAME}>Aircraft</label>
                            <select className='bg-white px-2 py-1 font-bold text-ezblue rounded-sm w-full border-1 border-ezblue'>
                                <option>
                                    N41JA (P28A)
                                </option>
                                <option>EUR</option>
                                <option>JPY</option>
                                <option>GBP</option>
                            </select>
                        </div>
                        
                        
                        
                        <TextInputComponent bold forceUpperCase title='From' formName='from' maxLength={4}/>
                        <TextInputComponent bold forceUpperCase title='To' formName='to' maxLength={4}/>
                        <TextInputComponent extended title='Route' formName='route'/>

                        <div className="w-full my-1"/>
                        
                        <NumberInputComponent title='PIC' formName='pic'/>
                        <NumberInputComponent title='SIC' formName='sic'/>
                        <NumberInputComponent title='Night' formName='night'/>
                        <NumberInputComponent title='Solo' formName='solo'/>
                        <NumberInputComponent title='Cross Country' formName='crossCountry'/>
                        <NumberInputComponent title='Dual Recieved' formName='dualRecieved'/>
                        <NumberInputComponent title='Dual Given' formName='dualGiven'/>
                        <NumberInputComponent int title='Day Landings' formName='dayLandings'/>
                        <NumberInputComponent int title='Night Landings' formName='nightLandings'/>
                        <NumberInputComponent int title='Total Landings' formName='totalLandings'/>

                        <div className="w-full my-1"/>

                        <NumberInputComponent buttonHidden title='Total Time' formName='totalTime'/>
                    </div>


                    {/* instrument info page */}
                    <div className="flex flex-wrap justify-left border-2 border-ezgray bg-gray-200 p-5 rounded-xl gap-x-5 gap-y-2 w-3/4 h-3/4">
                        <h1 className="text-xl font-bold w-full mb-2">INSTRUMENT</h1>
            
                        <NumberInputComponent title='Simulated IMC' formName='sim'/>
                        <NumberInputComponent title='Actual IMC' formName='imc'/>
                        <NumberInputComponent int buttonHidden title='Approaches' formName='numApproaches'/>
                        <TextInputComponent extended title='Approach Names' formName='approachNames'/>

                        <div className="w-full my-1"/>

                        <CheckboxComponent title='Holding' formName='holding'/>
                        <CheckboxComponent title='Intercepting and Tracking Courses' formName='intercepting'/>
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
                                <CheckboxComponent title="Checkride" formName='checkride'/>
                                <CheckboxComponent title="IPC" formName='ipc'/>
                                <CheckboxComponent title="Flight Review" formName='flightReview'/>
                            </div>
                        </div>
                       
                        

                        <div className="w-full my-2"/>
                        <div className="w-1/3 ml-10">
                            <label htmlFor='remarks' className={LABEL_CLASSNAME}>Remarks</label>
                            <textarea name='remarks' className='mt-2 px-2 py-1 w-120 h-56 bg-white rounded-sm border-1 text-md text-ezblue resiz'></textarea>
                        </div>
                        

                        <div className='absolute right-5 bottom-5 flex flex-col gap-y-2'>
                            <button className='border-2 border-ezgray bg-ezgray text-white font-bold text-xl p-2 rounded-md transition-all hover:border-gray-800'>Verify Times</button>
                            <button className='border-2 border-ezblue bg-ezblue text-white font-bold text-xl p-2 rounded-md transition-all hover:border-gray-800'>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        
    )
}

export default CreateLogbookEntry