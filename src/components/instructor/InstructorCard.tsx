import { FC, ReactElement } from "react"
import { LogbookEntry } from "../../hooks/logbook"

const EntryStatusText: React.FC<{instructorSignedDate: string | undefined}> = ({instructorSignedDate}: {instructorSignedDate: string | undefined})  => {
    if (!instructorSignedDate) {
        return <h2 className='text-amber-500 font-bold text-md'>Unsigned</h2>
    } else {
        return <h2 className='text-green-500 font-bold text-md'>Signed</h2>
    }
}

const InstructorCard: FC<{data: LogbookEntry, onClick: () => void}> = ({data, onClick}): ReactElement => {
    return (
            <button onClick={onClick} className="flex flex-col w-full h-max bg-gray-100 justify-start items-center px-2 py-1 transition hover:bg-gray-200">
                <div className='flex flex-row justify-between w-full'>
                    <div className='flex flex-col h-full items-start'>
                        <h2 className='text-ezblue font-bold text-md'>{new Date(data.date).toLocaleDateString('en-US')}</h2>
                        <h2 className='text-sm'>{data.from.toUpperCase()} - {data.to.toUpperCase()}</h2>
                        <h2 className='text-sm'>
                            {data.user.firstName + ' ' + data.user.lastName} 
                        </h2>
                        <EntryStatusText instructorSignedDate={data.instructorSignedDate}/>
                    </div>

                    
                    <div className='flex flex-col items-end h-full'>
                        <h2 className='text-ezblue font-bold text-md'>{data.aircraft ? data.aircraft.tailNumber.toUpperCase() : ''}</h2>
                        <h2 className='text-sm italic align-sub'>{data.aircraft ? data.aircraft.typeCode.toUpperCase() : ''}</h2>
                        <h2 className='text-sm'>
                            {data.totalTime} 
                            <p className='font-bold inline'> Total</p>
                        </h2>
                        
                    </div>
                </div>
            </button>
    )
}

export default InstructorCard