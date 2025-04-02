import { ReactElement, useEffect, useState } from "react"
import AircraftCard from "../../components/aircraft/AircraftCard"
import AircraftDisplay from "../../components/aircraft/AircraftDisplay"
import useAircraft, { Aircraft, AircraftActions } from "../../hooks/aircraft"
import CardLayout from "../../layouts/CardLayout"

const AircraftView = (): ReactElement => {
    const {aircraftData}: AircraftActions = useAircraft()
    const [displayData, setDisplayData] = useState<Aircraft | undefined>(undefined)

    const handleClick = (data: Aircraft): void => {
        setDisplayData(data)
    }

    useEffect(() => {
        if (aircraftData) {
            console.log(aircraftData)
        }
        
    }, [aircraftData])

    const AircraftList = () => {
        if (!aircraftData || aircraftData.length == 0) {
            return <h1>No aircraft available</h1>
        }
        
        return (
            aircraftData.map((object: Aircraft) => <AircraftCard data={object} onClick={handleClick} key={object.aircraftId}/>)
        )
    }

    return (
            <CardLayout title='My Aircraft' buttonText='Create New Aircraft' buttonHref='/dashboard/aircraft/create' ListObjects={<AircraftList/>} WindowDisplay={displayData ? <AircraftDisplay data={displayData}/> : null}/>
    )
}
export default AircraftView