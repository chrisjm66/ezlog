import useLogbook, { LogbookActions } from "../../hooks/logbook"
import { getRecentExperienceData, RecentExperienceData } from "../../services/experience"
import { useEffect, useState } from 'react'

const RecentExperienceTable: React.FC = () => {
    const [recentExperienceTime, setRecentExperienceTime] = useState<number>(90)
    const [recentExperienceData, setRecentExperienceData] = useState<RecentExperienceData>()
    const [totalTimes, setTotalTimes] = useState<RecentExperienceData>()

    const {logbookData}: LogbookActions = useLogbook()

    useEffect(() => {
        setTotalTimes(getRecentExperienceData(logbookData))
        setRecentExperienceData(getRecentExperienceData(logbookData, recentExperienceTime))
    }, [logbookData, setRecentExperienceData, recentExperienceTime])

    if (!recentExperienceData || !totalTimes) {
        return <></>
    }

    return (
        <table className=' border-2 table-auto'>
            <thead className='bg-gray-200 border-b-4'>
                <tr className=''>
                    <td>
                        Time Type
                    </td>
                    <td>
                        <select title='experience_days' className='text-xl font-medium bg-gray-200 text-black' onChange={(e) => setRecentExperienceTime(parseInt(e.target.value))} value={recentExperienceTime}>
                            <option value={30}>Previous 30 days</option>
                            <option value={90}>Previous 90 days</option>
                            <option value={180}>Previous 180 days</option>
                            <option value={365}>Previous 365 days</option>
                        </select>
                    </td>
                    <td>
                        Cumulative
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        PIC
                    </td>
                    <td>
                        {recentExperienceData.pic}
                    </td>
                    <td>
                        {totalTimes.pic}
                    </td>
                </tr>
                <tr>
                    <td>
                        Cross Country
                    </td>
                    <td>
                        {recentExperienceData.crossCountry}
                    </td>
                    <td>
                        {totalTimes.crossCountry}
                    </td>
                </tr>
                <tr>
                    <td>
                        Instrument
                    </td>
                    <td>
                        {recentExperienceData.instrument}
                    </td>
                    <td>
                        {totalTimes.instrument}
                    </td>
                </tr>
                <tr>
                    <td>
                        Night
                    </td>
                    <td>
                        {recentExperienceData.night}
                    </td>
                    <td>
                        {totalTimes.night}
                    </td>
                </tr>
                <tr>
                    <td>
                        Day Landings
                    </td>
                    <td>
                        {recentExperienceData.dayLandings}
                    </td>
                    <td>
                        {totalTimes.dayLandings}
                    </td>
                </tr>
                <tr>
                    <td>
                        Night Landings
                    </td>
                    <td>
                        {recentExperienceData.nightLandings}
                    </td>
                    <td>
                        {totalTimes.nightLandings}
                    </td>
                </tr>
                <tr>
                    <td>
                        Total Time
                    </td>
                    <td>
                        {recentExperienceData.totalTime}
                    </td>
                    <td>
                        {totalTimes.totalTime}
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default RecentExperienceTable