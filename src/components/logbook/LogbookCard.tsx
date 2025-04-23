import { FC, ReactElement } from "react"
import { LogbookEntry } from "../../hooks/logbook"
import { formatDate } from "../../services/format"

const LogbookCard: FC<{data: LogbookEntry, onClick}> = ({data, onClick}): ReactElement => {
    return (
            <button onClick={() => {onClick(data)}} className="flex flex-col w-full h-max bg-gray-100 justify-start items-center px-2 py-1 transition hover:bg-gray-200">
                <div className='flex flex-row justify-between w-full'>
                    <div className='flex flex-col h-full items-start'>
                        <h2 className='text-ezblue font-bold text-sm lg:text-md'>{formatDate(new Date(data.date))}</h2>
                        <h2 className='text-sm lg:text-md'>{data.from.toUpperCase()} - {data.to.toUpperCase()}</h2>
                        <h2 className='text-sm'>
                            {data.totalLandings} 
                            <p className='font-bold inline'> Landings</p>
                        </h2>
                        <h2 className='text-sm'>
                            {data.approaches} 
                            <p className='font-bold inline'> Approaches</p>
                        </h2>
                    </div>

                    
                    <div className='flex flex-col items-end h-full'>
                        <h2 className='text-ezblue font-bold text-sm lg:text-md'>{data.aircraft ? data.aircraft.tailNumber.toUpperCase() : ''}</h2>
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

export default LogbookCard