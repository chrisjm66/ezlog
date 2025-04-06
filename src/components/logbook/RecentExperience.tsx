import useLogbook, { LogbookActions } from "../../hooks/logbook"
import { useEffect, useState } from "react"
import RecentExperienceListItem from "./RecentExperienceListItem"
import { getRecentExperienceData, RecentExperienceData } from "../../services/Currency"
import { NavLink } from "react-router-dom"

const RecentExperience: React.FC = () => {
    const {logbookData}: LogbookActions = useLogbook()
    const [recentExperienceData, setRecentExperienceData] = useState<RecentExperienceData | undefined>(undefined)

    useEffect(() => {
        setRecentExperienceData(getRecentExperienceData(logbookData))
    }, [logbookData])

    const RecentExperienceList: React.FC = () => {
        if (!recentExperienceData) {
            return <></>
        }

        return (
            <>
                <RecentExperienceListItem title={'PIC'} time={recentExperienceData.pic} />
                <RecentExperienceListItem title={'Cross Country'} time={recentExperienceData.crossCountry} />
                <RecentExperienceListItem title={'Instrument'} time={recentExperienceData.instrument} />
                <RecentExperienceListItem title={'Night'} time={recentExperienceData.night} />
                <RecentExperienceListItem title={'Landings'} time={recentExperienceData.landings} />
                <RecentExperienceListItem title={'Total Time'} time={recentExperienceData.totalTime} lastItem/>
            </>
        )
    }
    return (
        <div className="grid-object">
            <h1 className="font-bold p-0">Recent Experience</h1>
            <h2 className='italic mb-5'>Previous 90 Days</h2>

            <RecentExperienceList />

            <NavLink className={'button'} to='/dashboard/logbook'>View Logbook</NavLink>
        </div>   
    )
}

export default RecentExperience