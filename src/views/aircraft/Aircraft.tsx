import AircraftCard from "../../components/aircraft/AircraftCard"
import AircraftForm from "../../components/aircraft/AircraftForm"
import useAircraft, { Aircraft, AircraftActions } from "../../hooks/aircraft"
import CardLayout from "../../layouts/CardLayout"
import { useNavigate, useParams } from "react-router-dom"

const AircraftView: React.FC<Props> = ({createAircraft}: Props) => {
    const aircraft: AircraftActions = useAircraft()
    const {aircraftId} = useParams()
    const navigate = useNavigate()

    const handleClick = (data: Aircraft): void => {
        navigate(`/dashboard/aircraft/${data.aircraftId}`)
    }

    const AircraftList = () => {
        if (!aircraft.aircraftData || aircraft.aircraftData.length == 0) {
            return <h1>No aircraft available</h1>
        }
        
        return (
            aircraft.aircraftData.map((object: Aircraft) => <AircraftCard data={object} onClick={handleClick} key={object.aircraftId}/>)
        )
    }

    const Window: React.FC = () => {
        return createAircraft ? <AircraftForm data={aircraft.getDefaultAircraftEntry()}/> : <AircraftForm data={aircraft.getAircraft(parseInt(aircraftId || ''))}/>
    }

    return (
            <CardLayout 
            title='My Aircraft' 
            buttonText='Create New Aircraft'
            buttonHref='/dashboard/aircraft/create' 
            ListObjects={<AircraftList/>} 
            WindowDisplay={<Window/>}
            />
    )
}

type Props = {
    createAircraft?: boolean
}

export default AircraftView