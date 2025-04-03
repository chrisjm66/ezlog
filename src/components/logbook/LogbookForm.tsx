import useLogbook, { LogbookActions, LogbookEntry } from "../../hooks/logbook"
import GeneralInfo from "../../components/logbook/GeneralInfo"
import InstrumentInfo from "../../components/logbook/InstrumentInfo"
import Remarks from "../../components/logbook/Remarks"
import SignatureDetails from "../instructor/SignatureDetails"
import SignatureRequest from "../instructor/SignatureRequest"
import Modal from "../modal/Modal"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import useAuth, { AuthActions } from "../../hooks/auth"

const LogbookForm: React.FC<Props> = ({data, readOnly}: Props) => {
    const signed: boolean = data?.instructorSignature ? true : false
    const logbook: LogbookActions = useLogbook()
    const auth: AuthActions = useAuth()

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

            if (data?.entryId) {
                console.log(data.entryId)
                await logbook.updateEntry(values)
            } else {
                await logbook.submitEntry(values)
            }

            setSubmitActive(false)
        } else {
            toast.error('Entry already submitting.')
        }
    }

    const sendLogbookDeleteRequest = async() => {
        if (!data || data.entryId == -1) {
            toast.error('No data available')
            return
        }

        logbook.deleteEntry(data)
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
                    eventValue = eventValue !== 'on' ? true : false // somethign to do with updates times or some other bs lol
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
        <div className='form-container'>
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
                        {data.entryId != -1 && data.user.userId == auth.user.userId ? <button type='button' onClick={requestDelete} className='bg-ezred'>Delete Entry</button> : ''}
                </div>
            </form>
        </div>
    )
}

type Props = {
    data?: LogbookEntry
    readOnly?: boolean
    createEntry?: boolean
}

export default LogbookForm
