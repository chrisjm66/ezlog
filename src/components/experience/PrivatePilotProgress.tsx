// https://www.ecfr.gov/current/title-14/chapter-I/subchapter-D/part-61/subpart-E/section-61.109

import { getRecentExperienceData, RecentExperienceData } from "../../services/experience"
import { useState, useEffect } from 'react'
import useLogbook, {LogbookActions} from "../../hooks/logbook"
import DetailListItem from "../currency/DetailListItem"

const PrivatePilotProgress: React.FC = () => {
    const [totalTimes, setTotalTimes] = useState<RecentExperienceData>()
    const {logbookData}: LogbookActions = useLogbook()

    useEffect(() => {
        setTotalTimes(getRecentExperienceData(logbookData))
    }, [logbookData])

    if (!totalTimes) {
        return (<h2>Loading</h2>)
    }

    return (
        <div className='grid-object w-100'>
            <h2 className='mb-5'>Private Pilot Experience</h2>
            <DetailListItem title='40 hours of flight time' checked={totalTimes?.totalTime >= 40}/>
            <DetailListItem title='20 hours of flight instruction' checked={totalTimes?.dual >= 20}/>
            <DetailListItem title='3 hours of night training' checked={totalTimes?.night >= 3}/>
            <DetailListItem title='10 night landings' checked={totalTimes?.nightLandings >= 10}/>
            <DetailListItem title='3 hours of simulated IMC' checked={totalTimes?.instrument >= 3}/>
            <DetailListItem title='10 hours as PIC (solo)' checked={totalTimes?.pic >= 10}/>
        </div>
    )
}

export default PrivatePilotProgress