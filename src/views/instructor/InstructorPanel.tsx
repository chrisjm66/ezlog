import React, { ReactNode, useEffect, useState } from 'react'
import CardLayout from '../../layouts/CardLayout'
import InstructorCardList from '../../components/instructor/InstructorCardList'
import useLogbook, { LogbookEntry } from '../../hooks/logbook'
import { useParams } from 'react-router-dom'
import InstructorForm from '../../components/instructor/InstructorForm'

const InstructorPanel: React.FC = (): ReactNode => {
    const [activeData, setActiveData] = useState<LogbookEntry | undefined>(undefined)
    const {entryId} = useParams()
    const logbook = useLogbook()

    useEffect(() => {
        const entry: LogbookEntry | undefined = logbook.getLogbookEntry(parseInt(entryId ? entryId : '-1'))
        if (entry) {
            setActiveData(entry)
        }
    }, [entryId, logbook, setActiveData])

    return (
        <CardLayout 
        title='Instructor Panel'
        ListObjects={<InstructorCardList/>}
        WindowDisplay={<InstructorForm data={activeData}/>}
        />
    )
}

export default InstructorPanel