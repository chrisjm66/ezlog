import { useEffect } from "react"
import { LogbookEntry } from "../../hooks/logbook"
import TextInputComponent from "../input/TextInputComponent"

const SignatureRequest: React.FC<Props> = ({data}) => {
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

            <button>Request Signature</button>
            <button className='bg-ezred'>Revoke Signature Request</button>
        </div>
    )
}

type Props = {
    data: LogbookEntry
}

export default SignatureRequest