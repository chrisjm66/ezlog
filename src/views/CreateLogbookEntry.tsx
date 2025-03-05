import { ReactElement } from "react"
import NumberInputComponent from "../components/NumberInputComponent"
import TextInputComponent from "../components/TextInputComponent"

const INPUT_CLASSNAME = 'px-2 py-1 w-full bg-white rounded-sm border-1 font-bold text-xl text-ezblue'
const LABEL_CLASSNAME = 'text-xl mb-2'

const CreateLogbookEntry = (): ReactElement => {
    return (
            <div className="flex flex-col justify-evenly items-center p-5">
                <h1 className="text-2xl font-bold w-full mb-5">Create Logbook Entry</h1>

                <form className="w-screen flex flex-wrap gap-y-10 justify-center">
                    <div className="flex flex-wrap justify-left border-2 border-ezgray bg-gray-200 p-5 rounded-xl gap-x-5 gap-y-2 w-3/4 h-3/4">
                        {/* general info page */}
                        <h1 className="text-xl font-bold w-full mb-5">GENERAL INFO</h1>

                        <div className="flex flex-col w-40">
                            <label className={LABEL_CLASSNAME}>Date</label>
                            <input type="date" placeholder="today" className={INPUT_CLASSNAME}/>
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
                        
                        
                        
                        <TextInputComponent bold forceUpperCase name='From' maxLength={4}/>
                        <TextInputComponent bold forceUpperCase name='To' maxLength={4}/>
                        <TextInputComponent extended name='Route'/>

                        <div className="w-full my-1"/>
                        
                        <NumberInputComponent name='PIC'/>
                        <NumberInputComponent name='SIC'/>
                        <NumberInputComponent name='Night'/>
                        <NumberInputComponent name='Solo'/>
                        <NumberInputComponent name='Cross Country'/>
                        <NumberInputComponent name='Dual Recieved'/>
                        <NumberInputComponent name='Dual Given'/>
                        <NumberInputComponent int name='Day Landings'/>
                        <NumberInputComponent int name='Night Landings'/>
                        <NumberInputComponent int name='Total Landings'/>

                        <div className="w-full my-1"/>

                        <div className="flex flex-col w-40">
                            <label className={LABEL_CLASSNAME}>Total Time</label>
                            <input title='from-airport' type="number" placeholder='0.0' min='0' className={INPUT_CLASSNAME}/>
                        </div>
                    </div>


                    {/* instrument info page */}
                    <div className="flex flex-wrap justify-left border-2 border-ezgray bg-gray-200 p-5 rounded-xl gap-x-5 gap-y-2 w-3/4 h-3/4">
                        <h1 className="text-xl font-bold w-full mb-5">INSTRUMENT</h1>
            
                        <NumberInputComponent name='Simulated IMC'/>
                        <NumberInputComponent name='Actual IMC'/>
                        <NumberInputComponent int buttonHidden name='Approaches'/>
                        <TextInputComponent extended name='Approach Names'/>

                        <div className="w-full my-1"/>88

                        <div className="flex flex-col w-40">
                            <label className={LABEL_CLASSNAME}>Total Time</label>
                            <input title='from-airport' type="number" placeholder='0.0' min='0' className={INPUT_CLASSNAME}/>
                        </div>
                    </div>
                </form>
            </div>
        
    )
}

export default CreateLogbookEntry