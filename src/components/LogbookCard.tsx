import { FC, ReactElement } from "react"
import { LogbookEntry, Aircraft } from "../hooks/logbook"

const LogbookDisplay: FC<{data: LogbookEntry, aircraft: Aircraft, onClick: void}> = ({data, aircraft, onClick}): ReactElement => {
    return (
            <button onClick={() => {onClick(data, aircraft)}} className="flex flex-col w-full h-24 bg-gray-100 justify-start items-center px-2 py-1 transition hover:bg-gray-200">
                <div className='flex flex-row justify-between w-full'>
                    <div className='flex flex-col h-full items-start'>
                        <h2 className='text-ezblue font-bold text-md'>{new Date(data.date).toLocaleDateString('en-US')}</h2>
                        <h2 className='text-md'>{data.from}test - test{data.to}</h2>
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
                        <h2 className='text-ezblue font-bold text-md'>{aircraft.tailNumber}</h2>
                        <h2 className='text-sm italic align-sub'>{aircraft.type}</h2>
                        <h2 className='text-sm'>
                            {data.totalTime} 
                            <p className='font-bold inline'> Total</p>
                        </h2>
                        
                    </div>
                </div>
            </button>
    )
}

export default LogbookDisplay