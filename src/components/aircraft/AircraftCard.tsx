import { FC, ReactElement } from "react"
import useAircraft, { Aircraft, AircraftActions } from "../../hooks/aircraft"

const AircraftCard: FC<{data: Aircraft, onClick: (data: Aircraft) => void}> = ({data, onClick}): ReactElement => {
    const aircraft: AircraftActions = useAircraft()
    return (
            <button onClick={() => {onClick(data)}} className="card">
                <div className='flex flex-row justify-between w-full'>
                    <div className='flex flex-col h-full items-start'>
                        <h2 className='text-ezblue font-bold text-md'>{data.tailNumber.toUpperCase()}</h2>
                        <h2 className='text-md'>{data.typeCode.toUpperCase()}</h2>
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
                            {aircraft.getAircraftTotalTime(data.aircraftId)}
                            <p className='font-bold inline'> Total</p>
                        </h2>
                        
                    </div>
                </div>
            </button>
    )
}

export default AircraftCard