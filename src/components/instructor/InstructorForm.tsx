import { FC, ReactElement, useState } from "react"
import { LogbookEntry } from "../../hooks/logbook"
import GeneralInfo from "../../components/logbook/GeneralInfo"
import InstrumentInfo from "../../components/logbook/InstrumentInfo"
import Remarks from "../../components/logbook/Remarks"
import SignLogbook from "./SignLogbook"
import SignatureDetails from "./SignatureDetails"
import useLogbook from "../../hooks/logbook"
import Modal from "../modal/Modal"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const InstructorForm: FC<{data?: LogbookEntry}> = ({data}): ReactElement => {
    const [signLogbookView, setSignLogbookView] = useState<boolean>(false)
    const [rejectView, setRejectView] = useState<boolean>(false)
    const signed: boolean = data?.instructorSignature ? true : false
    const logbook = useLogbook()
    const navigate = useNavigate()
    
    const sendRemoveRequest = async() => {
        if (!data) {
            toast.error('No entryId associated with this logbook entry.')
            return
        }

        await logbook.requestRemoveInstructorSignature(data.entryId)
        navigate('/dashboard/instructor')
        window.location.reload()
    }

    if (!data) {
        return <h2>No entries available</h2>
    }

    return (
        <div className='flex gap-y-5 flex-col overflow-y-scroll max-h-screen'>
            {signed ? <SignatureDetails data={data}/> : ''}

            <GeneralInfo readOnly={signed} data={data} instructor/>

            <InstrumentInfo readOnly={signed} data={data}/>

            <Remarks readOnly={signed} data={data}/>

            <div hidden={signed} className='flex gap-x-2'>
                    <button onClick={() => setSignLogbookView(true)} className='border-2 border-ezgray bg-ezgreen text-white font-bold text-xl p-2 rounded-md transition-all hover:border-gray-800'>Sign</button>
                    <button onClick={() => setRejectView(true)} className='border-2 border-ezgray bg-ezred text-white font-bold text-xl p-2 rounded-md transition-all hover:border-gray-800'>Reject Request</button>
            </div>

            <SignLogbook data={data} opened={signLogbookView} onClose={() => setSignLogbookView(false)}/>

            <Modal title='Confirm Action' open={rejectView} onClose={() => setRejectView(false)}>
                <h2>Reject Signature?</h2>
                <button className='bg-ezred mt-2 py-1' onClick={() => sendRemoveRequest()}>Reject</button>
            </Modal>
        </div>
    )
}

export default InstructorForm