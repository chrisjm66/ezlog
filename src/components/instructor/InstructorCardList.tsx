import useLogbook, { LogbookActions, LogbookEntry } from '../../hooks/logbook'
import useAuth, { AuthActions } from '../../hooks/auth'
import InstructorCard from '../../components/instructor/InstructorCard'
import { useNavigate } from 'react-router-dom'

const InstructorCardList: React.FC = () => {
    const {logbookData}: LogbookActions = useLogbook()
    const {user}: AuthActions = useAuth()
    const navigate = useNavigate()
    if (!logbookData) {
        return <h2>No Logbook Entries</h2>
    }

    return logbookData.map((entry: LogbookEntry) => {
        if (entry.instructor?.userId == user.userId) {
            return <InstructorCard data={entry} aircraft={undefined} key={entry.entryId} onClick={() => {navigate(`/dashboard/instructor/${entry.entryId}`)}}/>
        }
    })
}

export default InstructorCardList