import { ReactElement } from "react"
import useLogbook, { LogbookActions, LogbookEntry } from "../../hooks/logbook.tsx"
import LogbookCard from "../../components/logbook/LogbookCard.tsx"
import LogbookDisplay from "../../components/logbook/LogbookDisplay.tsx"
import CardLayout from '../../layouts/CardLayout.tsx'
import { useNavigate, useParams } from "react-router-dom"

const Logbook = (): ReactElement => {
    const logbook: LogbookActions = useLogbook()
    const {entryId} = useParams()
    const navigate = useNavigate()
    const handleClick = (data: LogbookEntry): void => {
        navigate(`/dashboard/logbook/${data.entryId}`)
    }

    const LogbookCards: React.FC = () => {
        if (!logbook.logbookData || logbook.logbookData.length == 0) {
            return <h3 className='p-5'>No Entries</h3>
        }
        
        return (
            logbook.logbookData.map((object: LogbookEntry) => <LogbookCard key={object.entryId} data={object} onClick={handleClick}/>)
        )
    }

    return (
        <CardLayout title='My Logbook' 
            buttonText='Create New Entry' 
            buttonHref='/dashboard/logbook/create' 
            ListObjects={<LogbookCards/>} 
            WindowDisplay={entryId ? <LogbookDisplay data={logbook.getLogbookEntry(parseInt(entryId))}/> : null}
        />
    )
}

export default Logbook