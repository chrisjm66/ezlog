import { FC, ReactElement, useState } from "react"
import { LogbookEntry } from "../../hooks/logbook"
import GeneralInfo from "../../views/logbook/GeneralInfo"
import InstrumentInfo from "../../views/logbook/InstrumentInfo"
import Remarks from "../../views/logbook/Remarks"
import SignLogbook from "./SignLogbook"
import SignatureDetails from "./SignatureDetails"

const InstructorForm: FC<{data?: LogbookEntry}> = ({data}): ReactElement => {
    const [signLogbookView, setSignLogbookView] = useState<boolean>(false)
    const signed: boolean = data?.instructorSignature ? true : false

    if (!data) {
        return <h2>No entries available</h2>
    }

    return (
        <div className='flex gap-y-5 flex-col overflow-y-scroll max-h-screen'>
            {signed ? <SignatureDetails data={data}/> : ''}

            <GeneralInfo readOnly={signed} data={data}/>

            <InstrumentInfo readOnly={signed} data={data}/>

            <Remarks readOnly={signed} data={data}/>

            <div hidden={signed} className='absolute right-5 bottom-5 flex flex-col gap-y-2'>
                    <button onClick={() => setSignLogbookView(true)} className='border-2 border-ezgray bg-ezgreen text-white font-bold text-xl p-2 rounded-md transition-all hover:border-gray-800'>Sign</button>
                    <button className='border-2 border-ezgray bg-ezred text-white font-bold text-xl p-2 rounded-md transition-all hover:border-gray-800'>Reject Request</button>
            </div>

            <SignLogbook data={data} opened={signLogbookView} onClose={() => setSignLogbookView(false)}/>
        </div>
    )
}

export default InstructorForm