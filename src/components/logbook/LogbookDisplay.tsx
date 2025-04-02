import { FC, ReactElement, useState } from "react"
import { LogbookEntry } from "../../hooks/logbook"
import { Aircraft } from "../../hooks/aircraft"
import Modal from "../modal/Modal"
import axios from "axios"
import { NavLink } from "react-router-dom"
import GeneralInfo from "../../views/logbook/GeneralInfo"
import InstrumentInfo from "../../views/logbook/InstrumentInfo"
import Remarks from "../../views/logbook/Remarks"
import SignatureDetails from "../instructor/SignatureDetails"

const LogbookDisplay: FC<{data?: LogbookEntry, aircraft?: Aircraft}> = ({data}): ReactElement => {
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [modalBody, setModalBody] = useState<string>('')

    const requestDelete = () => {
        setModalVisible(true)
        setModalBody('Delete logbook entry?')        
    }

    const sendDeleteRequest = async() => {
        //@ts-expect-error not available if data checked
        const response = await axios.delete('/api/logbook', {data: {entryId: data.entryId}}) 
        if (response.status == 200) {
            window.location.reload()
        }
    }

    if (!data) {
        return (
            <h2>No data available</h2>
        )
    }
    
    return (
        <div className='flex gap-y-5 flex-col overflow-y-scroll max-h-screen'>
            <Modal open={modalVisible} title='Confirm Action' onClose={() => setModalVisible(false)}>
                <h2>{modalBody}</h2>

                <button onClick={() => setModalVisible(false)} className='border-2 border-ezgray bg-ezgray text-white font-bold text-xl p-2 rounded-md transition-all hover:border-gray-800'>Cancel</button>
                <button onClick={sendDeleteRequest} className='border-2 border-ezgray bg-ezred text-white font-bold text-xl p-2 rounded-md transition-all hover:border-gray-800'>Confirm</button>
            </Modal>

            {data.instructorSignature ? <SignatureDetails data={data}/> : ''}
            <GeneralInfo readOnly data={data}/>

            <InstrumentInfo readOnly data={data}/>

            <Remarks readOnly data={data}/>

            <div className='w-full flex flex-row gap-x-2'>
                    {!data.instructorSignature ? <NavLink to={`/dashboard/logbook/edit/${data.entryId}`} className='border-2 border-ezgray bg-ezgray text-white font-bold text-xl p-2 rounded-md transition-all hover:border-gray-800'>Edit</NavLink> : ''}
                    <button onClick={requestDelete} className='border-2 border-ezgray bg-ezred text-white font-bold text-xl p-2 rounded-md transition-all hover:border-gray-800'>Delete Entry</button>
            </div>
        </div>
    )
}

export default LogbookDisplay