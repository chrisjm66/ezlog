import { JSX, ReactElement, useState } from "react"
import useLogbook, { LogbookActions, LogbookEntry } from "../../hooks/logbook"
import LogbookCard from "../../components/LogbookCard"
import LogbookDisplay from "../../components/LogbookDisplay"
import useAircraft, { Aircraft, AircraftActions } from "../../hooks/aircraft"
import CardLayout from '../../layouts/CardLayout.tsx'

const Logbook = (): ReactElement => {
    const {getAircraft}: AircraftActions = useAircraft()
    const {logbookData}: LogbookActions = useLogbook()
    const [displayData, setDisplayData] = useState<LogbookEntry | undefined>(undefined)
    const [displayAircraft, setDisplayAircraft] = useState<Aircraft | undefined>(undefined)
    
    const handleClick = (data: LogbookEntry, aircraft: Aircraft): void => {
        setDisplayData(data)
        setDisplayAircraft(aircraft)
    }

    const LogbookCards: React.FC = () => {
        if (!logbookData || logbookData.length == 0) {
            return <h3 className='p-5'>No Entries</h3>
        }
        
        return (
            logbookData.map((object: LogbookEntry) => <LogbookCard data={object} aircraft={getAircraft(object.aircraftId)} onClick={handleClick}/>)
        )
    }
    
    return <CardLayout title='My Logbook' buttonText='Create New Entry' buttonHref='/dashboard/logbook/create' ListObjects={<LogbookCards/>} WindowDisplay={displayData ? <LogbookDisplay data={displayData} aircraft={displayAircraft}/> : null}/>
}

export default Logbook