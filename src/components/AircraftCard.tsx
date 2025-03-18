import { FC, ReactElement } from "react"
import { Aircraft } from "../hooks/aircraft"

const AircraftCard: FC<{data: Aircraft, onClick: (data: Aircraft) => void}> = ({data, onClick}): ReactElement => {
    return (
            <button onClick={() => {onClick(data)}} className="flex flex-col w-full h-24 bg-gray-100 justify-start items-center px-2 py-1 transition hover:bg-gray-200">
                <div className='flex flex-row justify-between w-full'>
                    <div className='flex flex-col h-full items-start'>
                        <h2 className='text-ezblue font-bold text-md'>{new Date(data.tailNumber).toLocaleDateString('en-US')}</h2>
                        <h2 className='text-md'>{data.type}</h2>
                        <h2 className='text-sm'>
                            {data.make} 
                        </h2>
                        <h2 className='text-sm'>
                            {data.model} 

                        </h2>
                    </div>

                    
                    <div className='flex flex-col items-end h-full'>
                        <h2 className='text-ezblue font-bold text-md'>-</h2>
                        <h2 className='text-sm italic align-sub'>-</h2>
                        <h2 className='text-sm'>
                            - 
                            <p className='font-bold inline'> Total</p>
                        </h2>
                        
                    </div>
                </div>
            </button>
    )
}

export default AircraftCard