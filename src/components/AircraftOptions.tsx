import { JSX } from "react"
import useAircraft, { Aircraft, AircraftActions } from "../hooks/aircraft"
const AircraftOptions = () => {
    const aircraft: AircraftActions = useAircraft()
    const rows: JSX.Element[] = []

    aircraft.aircraftData?.map((plane: Aircraft) => {
        rows.push(
            <option title={plane.tailNumber} value={plane.aircraftId} key={plane.aircraftId}>{plane.tailNumber} ({plane.typeCode})</option>
        )
    })

    return (
        <select required name='aircraftId' title='aircraft' className='bg-white px-2 py-1 font-bold text-ezblue rounded-sm w-full border-1 border-ezblue'>
            {rows}
        </select>
    )
}

export default AircraftOptions