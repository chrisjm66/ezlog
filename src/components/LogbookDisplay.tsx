import { FC, ReactElement, useState } from "react"
import { LogbookEntry } from "../hooks/logbook"
import { Aircraft } from "../hooks/aircraft"
import CheckboxComponent from "../components/CheckboxInputComponent"
import DisplayComponent from "./DisplayComponent"
import Modal from "./Modal"
import axios from "axios"
import { Link, NavLink } from "react-router-dom"

const LABEL_CLASSNAME = 'text-xl mb-2'
const LogbookDisplay: FC<{data: LogbookEntry, aircraft?: Aircraft}> = ({data, aircraft}): ReactElement => {
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [modalBody, setModalBody] = useState<string>('')

    const requestDelete = () => {
        setModalVisible(true)
        setModalBody('Delete logbook entry?')        
    }

    const sendDeleteRequest = async() => {
        const response = await axios.delete('/api/logbook', {data: {entryId: data.entryId}}) 
        if (response.status == 200) {
            window.location.reload()
        }
    }

    return (
        <div className='flex gap-y-5 flex-col overflow-y-scroll max-h-screen'>
            <Modal open={modalVisible} title='Confirm Action' onClose={() => setModalVisible(false)}>
                <h2>{modalBody}</h2>

                <button onClick={() => setModalVisible(false)} className='border-2 border-ezgray bg-ezgray text-white font-bold text-xl p-2 rounded-md transition-all hover:border-gray-800'>Cancel</button>
                <button onClick={sendDeleteRequest} className='border-2 border-ezgray bg-ezred text-white font-bold text-xl p-2 rounded-md transition-all hover:border-gray-800'>Confirm</button>
            </Modal>

            <div className="flex flex-wrap justify-left border-2 border-ezgray bg-gray-200 p-5 rounded-xl gap-x-5 gap-y-1 w-3/4 h-3/4">
                {/* general info page */}
                <h1 className="text-xl font-bold w-full mb-5">GENERAL INFO</h1>

                <DisplayComponent title='Date' value={data.date.slice(0,10)}/>

                <DisplayComponent extended title='Aircraft' value={aircraft ? `${aircraft.tailNumber} (${aircraft.typeCode})` : 'Undefined'}/>
                
                
                
                <DisplayComponent title='From' value={data.from.toUpperCase()}/>
                <DisplayComponent title='To' value={data.to.toUpperCase()}/>
                <DisplayComponent title='Route' value={data.route}/>

                <div className="w-full my-1"/>

                <DisplayComponent title='PIC' value={data.pic}/>
                <DisplayComponent title='SIC' value={data.sic}/>
                <DisplayComponent title='Night' value={data.night}/>
                <DisplayComponent title='Solo' value={data.solo}/>
                <DisplayComponent title='Cross Country' value={data.crossCountry}/>
                <DisplayComponent title='Dual Recieved' value={data.dualRecieved}/>
                <DisplayComponent title='Dual Given' value={data.dualGiven}/>
                <DisplayComponent title='Day Landings' value={data.dayLandings}/>
                <DisplayComponent title='Night Landings' value={data.nightLandings}/>
                <DisplayComponent title='Total Landings' value={data.totalLandings}/>

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

                <div className='absolute right-5 bottom-5 flex flex-col gap-y-2'>
                    <NavLink to={`/dashboard/logbook/edit/${data.entryId}`} className='border-2 border-ezgray bg-ezgray text-white font-bold text-xl p-2 rounded-md transition-all hover:border-gray-800'>Edit</NavLink>
                    <button onClick={requestDelete} className='border-2 border-ezgray bg-ezred text-white font-bold text-xl p-2 rounded-md transition-all hover:border-gray-800'>Delete Entry</button>
                </div>
            </div>
        </div>
    )
}

export default LogbookDisplay