import { ReactElement, useState } from "react"
import useLogbook, { LogbookActions, LogbookEntry } from "../../hooks/logbook"
import LogbookCard from "../../components/logbook/LogbookCard.tsx"
import LogbookDisplay from "../../components/logbook/LogbookDisplay.tsx"
import CardLayout from '../../layouts/CardLayout.tsx'

const Logbook = (): ReactElement => {
    const {logbookData}: LogbookActions = useLogbook()
    const [displayData, setDisplayData] = useState<LogbookEntry | undefined>(undefined)
    
    const handleClick = (data: LogbookEntry): void => {
        setDisplayData(data)
    }

    const LogbookCards: React.FC = () => {
        if (!logbookData || logbookData.length == 0) {
            return <h3 className='p-5'>No Entries</h3>
        }
        
        return (
            logbookData.map((object: LogbookEntry) => <LogbookCard data={object} onClick={handleClick}/>)
        )
    }
    
    return <CardLayout title='My Logbook' buttonText='Create New Entry' buttonHref='/dashboard/logbook/create' ListObjects={<LogbookCards/>} WindowDisplay={displayData ? <LogbookDisplay data={displayData}/> : null}/>
}

export default Logbook