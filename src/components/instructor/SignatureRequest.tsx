import { useEffect } from "react"
import useLogbook, { LogbookActions, LogbookEntry } from "../../hooks/logbook"
import TextInputComponent from "../input/TextInputComponent"
import axios from "axios"
import { toast } from "react-toastify"

const SignatureRequest: React.FC<Props> = ({data}) => {
    const logbook: LogbookActions = useLogbook()

    const sendSignatureRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
        const formData = new FormData((e.target as HTMLButtonElement).form!)
        const instructorEmail: FormDataEntryValue | null = formData.get('instructorEmail')

        if (!instructorEmail || instructorEmail == '') {
            return toast.error('Must enter instructor email.')
        }
        
        axios.put('/api/instructor/request', {
            entryId: data.entryId,
            instructorEmail: instructorEmail
        }).then((response) => {
            if (response.status == 200) {
                toast.success('Instructor signature requested!')
                logbook.populateLogbookEntries()
            }
        }).catch((error) => {
            console.error(error)

            if (error.status == 400) {
                toast.error('Error 400 - ' + error.response.statusText)
            } else {
                toast.error(`Error ${error.status} - ` + error.response.statusText)
            }
        })
    }

    useEffect(() => {
        console.log(data.instructor)
    }, [data])

    return (
        <div className='gray-container'>
            <h1 className='form-header'>Instructor</h1>
            <h2 className='italic mb-4'>Request an instructor signature.</h2>

            <div className='w-full'/>

            <TextInputComponent extended title='Instructor Email' readOnly={data.instructor ? true : false} formName='instructorEmail' value={data.instructor?.email || ''} />
            
            <div className='w-full'/>

            <h2>Status: <b>{data.instructor ? 'Pending' : 'No request made'}</b></h2>

            <div className='w-full'/>

            {!data.instructor ? <button type='button' onClick={sendSignatureRequest}>Request Signature</button> : ''}
            {data.instructor ? <button type='button' onClick={() => logbook.requestRemoveInstructorSignature(data?.entryId)} className='bg-ezred' >Revoke Signature Request</button> : ''}
        </div>
    )
}

type Props = {
    data: LogbookEntry
}

export default SignatureRequest