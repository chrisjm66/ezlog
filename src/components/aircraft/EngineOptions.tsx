import { useEffect, useState } from "react"
import { Aircraft } from "../../hooks/aircraft"

const AircraftOptions: React.FC<Props> = ({data}: Props) => {
    const [selectedEngineValue, setSelectedEngineValue] = useState<string>('P')

    useEffect(() => {
        if (data.engineType) {
            setSelectedEngineValue(data.engineType)
        }
    }, [data, setSelectedEngineValue])

    return (
        <div className='flex flex-col w-64'>
            <label htmlFor='engineType'>Engine Type</label>
            <select title='engineType' name='engineType' value={selectedEngineValue} onChange={(e) => setSelectedEngineValue(e.target.value)}>
                <option value='P'>Piston</option>
                <option value='T'>Turboprop</option>
                <option value='J'>Jet</option>
            </select>
        </div> 
    )
}

type Props = {
    data: Aircraft
}
export default AircraftOptions