import { JSX, useEffect, useState } from "react"
import useAircraft, { Aircraft, AircraftActions } from "../../hooks/aircraft"
import { LogbookEntry } from "../../hooks/logbook"

const AircraftOptions: React.FC<Props> = ({data, readOnly}: Props) => {
    const aircraft: AircraftActions = useAircraft()
    const rows: JSX.Element[] = []
    const [selectedAircraftId, setAircraftId] = useState<number>(-1)

    const handleChange = (e) => {
        setAircraftId(e.target.value)
    }

    aircraft.aircraftData?.map((plane: Aircraft) => {
        rows.push(
            <option title={plane.tailNumber} value={plane.aircraftId} key={plane.aircraftId}>{plane.tailNumber} ({plane.typeCode.toUpperCase()})</option>
        )
    })

    useEffect(() => {
        setAircraftId(data?.aircraftId || -1)
    }, [data, setAircraftId])

    if (data && readOnly) {
        return (
            <div className='w-50'>
                <label>Aircraft</label>
                <input title='aircraft' className='mt-2' readOnly value={data?.aircraft ? data.aircraft.tailNumber : 'Undefined'}/>
            </div> 
        )
    } else {
        return (
            <div>
                <label htmlFor='aircraftId'>Aircraft</label>
                <select title='aircraftId' name='aircraftId' onChange={handleChange} value={selectedAircraftId} className='bg-white px-2 py-1 font-bold text-ezblue rounded-sm w-full border-1 border-ezblue mt-2 h-10'>
                    {rows}
                </select>
            </div> 
        )
    }

    
}

type Props = {
    data?: LogbookEntry
    readOnly?: boolean
}

export default AircraftOptions