import { useEffect, useRef } from "react";
import { LogbookEntry } from "../../hooks/logbook";
import TextInputComponent from "../input/TextInputComponent";
import CanvasDraw from 'react-canvas-draw'



const SignatureDetails: React.FC<Props> = ({data}) => {
    const canvas = useRef<React.JSX.Element | null>(null)
    const instructor  = data.instructor

    useEffect(() => {
        if (canvas.current) {
            //@ts-expect-error no datatype for canvas
            canvas.current.loadSaveData(data.instructorSignature)
        }
    }, [canvas, data.instructorSignature])

    return (
        <div className='gray-container'>
            <h1 className='form-header'>Signed Entry</h1>
            <h2 className='italic mb-4'>This is a signed logbook entry. It cannot be edited unless the signature is removed.</h2>

            <div className='w-full'/>
            <TextInputComponent readOnly title='Instructor Name' value={data.instructor?.firstName + ' ' + data.instructor?.lastName} />
            
            <TextInputComponent readOnly title='Expiration' value={data.instructorExpiryDate} />

            <div className='w-full'/>

            <div className='my-2 relative'>
                <CanvasDraw ref={canvas} brushRadius={5} hideGrid={true} disabled canvasWidth={400} canvasHeight={150}/>
                <h4 className='italic tracking-tighter absolute right-1 bottom-1 select-none'>{instructor?.firstName.toUpperCase()} {instructor?.lastName.toUpperCase()} - {instructor?.instructorCid?.toUpperCase()} EXP {instructor?.instructorExpiryDate?.toUpperCase()}</h4>
            </div>
        </div>
    )
}

type Props = {
    data: LogbookEntry
}
export default SignatureDetails