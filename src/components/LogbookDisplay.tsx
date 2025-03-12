import { FC, ReactElement } from "react"
import { LogbookEntry, Aircraft } from "../hooks/logbook"
import CheckboxComponent from "../components/CheckboxInputComponent"
import DisplayComponent from "./DisplayComponent"

const LABEL_CLASSNAME = 'text-xl mb-2'
const LogbookDisplay: FC<{data: LogbookEntry, aircraft: Aircraft}> = ({data, aircraft}): ReactElement => {
    return (
        <div>
<div className="flex flex-wrap justify-left border-2 border-ezgray bg-gray-200 p-5 rounded-xl gap-x-5 gap-y-1 w-3/4 h-3/4">
            {/* general info page */}
            <h1 className="text-xl font-bold w-full mb-5">GENERAL INFO</h1>

            <DisplayComponent title='Date' value={data.date.slice(0,10)}/>

            <DisplayComponent extended title='Aircraft' value={`${aircraft.tailNumber} (${aircraft.type})`}/>
            
            
            
            <DisplayComponent title='From' value={data.totalTime}/>
            <DisplayComponent title='To' value={data.totalTime}/>
            <DisplayComponent title='Route' value={data.totalTime}/>

            <div className="w-full my-1"/>

            <DisplayComponent title='PIC' value={data.totalTime}/>
            <DisplayComponent title='SIC' value={data.totalTime}/>
            <DisplayComponent title='Night' value={data.totalTime}/>
            <DisplayComponent title='Solo' value={data.totalTime}/>
            <DisplayComponent title='Cross Country' value={data.totalTime}/>
            <DisplayComponent title='Dual Recieved' value={data.totalTime}/>
            <DisplayComponent title='Dual Given' value={data.totalTime}/>
            <DisplayComponent title='Day Landings' value={data.totalTime}/>
            <DisplayComponent title='Night Landings' value={data.totalTime}/>
            <DisplayComponent title='Total Landings' value={data.totalTime}/>

            <div className="w-full my-1"/>

            <DisplayComponent title='Total Time' value={data.totalTime}/>
        </div>


        {/* instrument info page */}
        <div className="flex flex-wrap justify-left border-2 border-ezgray bg-gray-200 p-5 rounded-xl gap-x-5 gap-y-2 w-3/4 h-3/4">
            <h1 className="text-xl font-bold w-full mb-2">INSTRUMENT</h1>

            <DisplayComponent title='Simulated IMC' value={data.simImc}/>
            <DisplayComponent title='Actual IMC' value={data.actImc}/>
            <DisplayComponent title='Approaches' value={data.approaches}/>
            <DisplayComponent extended title='Approach Names' value={data.approachNames}/>

            <div className="w-full my-1"/>

            <CheckboxComponent readOnly title='Holding' value={data.holding}/>
            <CheckboxComponent readOnly title='Intercepting and Tracking Courses' value={data.intercepting}/>
        </div>

        {/* remarks info page */}
        <div className="flex flex-wrap justify-left border-2 border-ezgray bg-gray-200 p-5 rounded-xl gap-x-5 w-3/4 h-3/4 relative">
            <h1 className="text-xl font-bold w-full mb-2">REMARKS</h1>

            <div className="w-1/3 ml-10">
                <h2 className='text-lg font-bold mb-2'>Flight Tags</h2>
                <div className='flex justify-left gap-x-12 w-full items-end'>
                    <CheckboxComponent readOnly title="Checkride" value={data.checkride}/>
                    <CheckboxComponent readOnly title="IPC" value={data.ipc}/>
                    <CheckboxComponent readOnly title="Flight Review" value={data.flightReview}/>
                </div>
            </div>
           
            

            <div className="w-full my-2"/>
            <div className="w-1/3 ml-10">
                <label htmlFor='remarks' className={LABEL_CLASSNAME}>Remarks</label>
                <textarea name='remarks' readOnly value={data.remarks} className='mt-2 px-2 py-1 w-120 h-56 bg-white rounded-sm border-1 text-md text-ezblue resiz'></textarea>
            </div>
        </div>
        </div>
        
    )
}

export default LogbookDisplay