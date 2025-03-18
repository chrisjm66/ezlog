import { ReactElement, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import useLogbook, { LogbookActions, LogbookEntry } from "../hooks/logbook"
import LogbookCard from "../components/LogbookCard"
import LogbookDisplay from "../components/LogbookDisplay"
import { Aircraft } from "../hooks/aircraft"

const Logbook = (): ReactElement => {
    const {logbookData}: LogbookActions = useLogbook()
    const [displayData, setDisplayData] = useState<LogbookEntry | undefined>(undefined)
    const [displayAircraft, setDisplayAircraft] = useState<Aircraft | undefined>(undefined)

    const handleClick = (data: LogbookEntry, aircraft: Aircraft): void => {
        setDisplayData(data)
        setDisplayAircraft(aircraft)
    }

    useEffect(() => {
        console.log('ran' + typeof(logbookData))

        if (logbookData) {
            console.log(logbookData)
        }
        
    }, [logbookData])
    return (
            <div className="flex flex-col h-full">
                <div className="w-full p-2 m-2">
                    <h1 className="text-3xl font-bold justify-self-start inline-block">My Logbook</h1>
                    <NavLink className='bg-ezblue justify-self-stretch inline-block p-2 rounded-md ml-5' to='/dashboard/logbook/create'>Create New Entry</NavLink>
                </div>

                <div className='flex flex-row h-rvh'>
                    <div className='flex flex-col w-60 overflow-x-hidden overflow-y-auto gap-y-1 h-svh'>
                        {logbookData?.map((object: LogbookEntry) => <LogbookCard data={object} aircraft={{} as Aircraft} onClick={handleClick} key={object.entryId}/>)}
                    </div>

                    <div className='w-screen h-fit mx-1 px-2'>
                
                        {displayData ? <LogbookDisplay data={displayData} aircraft={{tailNumber: 'N41JA', make: 'Piper', model: 'Archer II', type: 'P28A', numberOfEngines: 1, engineType: 'piston'}} />: ''}
                    </div>
                </div>
            </div>
        
    )
}

export default Logbook