import React from "react";
import CheckboxComponent from "../../components/input/CheckboxInputComponent";
import { LogbookEntry } from "../../hooks/logbook";

const Remarks: React.FC<Props> = ({data, readOnly} : Props) => {
    return (
        <div className="gray-container">
            <h1 className="form-header">REMARKS</h1>

            <div className="w-1/3 ml-10">
                <h2 className='text-lg font-bold mb-2'>Flight Tags</h2>
                <div className='flex justify-left gap-x-12 w-full items-end'>
                    <CheckboxComponent readOnly={readOnly} formName='checkride' title="Checkride" value={data.checkride}/>
                    <CheckboxComponent readOnly={readOnly} formName='ipc' title="IPC" value={data.ipc}/>
                    <CheckboxComponent readOnly={readOnly} formName='flightReview' title="Flight Review" value={data.flightReview}/>
                </div>
            </div>
        
            

            <div className="w-full my-2"/>
            <div className="w-1/3 ml-10">
                <label htmlFor='remarks'>Remarks</label>
                <textarea title='remarks' name='remarks' readOnly={readOnly} defaultValue={data.remarks} className='mt-2 px-2 py-1 w-120 h-56 bg-white rounded-sm border-1 text-md text-ezblue resize-none'></textarea>
            </div>

            
        </div>
    )
}

type Props = {
    data: LogbookEntry
    readOnly?: boolean
}

export default Remarks