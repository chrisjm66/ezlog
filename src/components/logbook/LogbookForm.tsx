import useLogbook, { LogbookActions, LogbookEntry } from "../../hooks/logbook"
import GeneralInfo from "../../components/logbook/GeneralInfo"
import InstrumentInfo from "../../components/logbook/InstrumentInfo"
import Remarks from "../../components/logbook/Remarks"
import SignatureDetails from "../instructor/SignatureDetails"
import SignatureRequest from "../instructor/SignatureRequest"
import Modal from "../modal/Modal"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"

const LogbookForm: React.FC<Props> = ({data, readOnly}: Props) => {
    const signed: boolean = data?.instructorSignature ? true : false
    const logbook: LogbookActions = useLogbook()

    const [values, setValues] = useState<LogbookEntry>(logbook.getDefaultLogbookEntry())
    const [signatureModalVisible, setSignatureModalVisible] = useState<boolean>(false)
    const [confirmModalVisible, setConfirmModalVisible] = useState<boolean>(false)
    const [modalBody, setModalBody] = useState<string>('')
    const [submitActive, setSubmitActive] = useState<boolean>(false)

    const requestDelete = () => {
        setConfirmModalVisible(true)
        setModalBody('Delete logbook entry?')        
    }

    const sendCreateOrUpdateRequest = async(form) => {
        if (!submitActive) {
            form.preventDefault()
            setSubmitActive(true)
            let response: number
            if (data?.entryId) {
                console.log(data.entryId)
                response = await logbook.updateEntry(values)
            } else {
                response = await logbook.submitEntry(values)
            }
    
            if (response == 200) {
                toast.success('Entry submitted!')
            } else {
                toast.error('Error occured')
            }
    
            setSubmitActive(false)
            logbook.populateLogbookEntries()
        } else {
            toast.error('Entry already submitting.')
        }
    }

    const sendLogbookDeleteRequest = async() => {
        //@ts-expect-error not available if data checked
        const response = await axios.delete('/api/logbook', {data: {entryId: data.entryId}}) 
        if (response.status == 200) {
            window.location.reload()
        }
    }

    const handleChange = (event): void => {
        let eventValue: unknown = event.target.value
        try {
            switch (typeof(logbook.getDefaultLogbookEntry()[event.target.name])) {
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
            console.log(values)
        } catch (error) {
            console.error(error)
        }
        
        
    };

    useEffect(() => {
        if (data) {
            setValues(data)
        }
    }, [data, setValues])

    if (!data) {
        return (
            <h2>No data available</h2>
        )
    }

    return (
        <form onChange={handleChange} onSubmit={sendCreateOrUpdateRequest} className='flex gap-y-5 flex-col overflow-y-scroll max-h-screen'>
            <Modal open={confirmModalVisible} title='Confirm Action' onClose={() => setConfirmModalVisible(false)}>
                <h2>{modalBody}</h2>

                <button onClick={() => setConfirmModalVisible(false)} className='bg-ezgray mt-2 text-sm'>Cancel</button>
                <button onClick={sendLogbookDeleteRequest} className='bg-ezred ml-2 text-sm'>Confirm</button>
            </Modal>

            <Modal open={signatureModalVisible} title='Confirm Action' onClose={() => setSignatureModalVisible(false)}>
                <h2>{modalBody}</h2>

                <button onClick={() => setSignatureModalVisible(false)} className='bg-ezgray mt-2 text-sm'>Cancel</button>
                <button onClick={() => console.log('meow')} className='bg-ezred ml-2 text-sm'>Confirm</button>
            </Modal>

            {signed ? <SignatureDetails data={data}/> : ''}
    
            <GeneralInfo readOnly={signed || readOnly} data={data}/>
    
            <InstrumentInfo readOnly={signed || readOnly} data={data}/>
    
            {!data.instructorSignature && data.entryId ? <SignatureRequest data={data}/> : ''}

            <Remarks readOnly={signed || readOnly} data={data}/>
    
            <div className='w-full flex flex-row gap-x-2'>
                    {!data.instructorSignature ? <button type='submit'>Submit Changes</button> : <button type='button' onClick={() => logbook.requestRemoveInstructorSignature(data?.entryId)} className='bg-amber-500'>Remove Instructor Signature</button>}
                    <button type='button' onClick={requestDelete} className='bg-ezred'>Delete Entry</button>
            </div>
        </form>
    )
}

type Props = {
    data?: LogbookEntry
    readOnly?: boolean
}

export default LogbookForm
