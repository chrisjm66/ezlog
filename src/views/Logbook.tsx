import { ReactElement, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import useLogbook, { LogbookActions, LogbookEntry } from "../hooks/logbook"
import LogbookCard from "../components/LogbookCard"
import LogbookDisplay from "../components/LogbookDisplay"
import { Aircraft } from "../hooks/logbook"

const INITIAL_STATE: LogbookEntry = {
            date: new Date().toISOString(),
            aircraftId: -1,
            totalTime: 0,
            pic: 0,
            sic: 0,
            solo: 0,
            crossCountry: 0,
            simImc: 0,
            actImc: 0,
            night: 0,
            dayLandings: 0,
            nightLandings: 0,
            totalLandings: 0,
            holding: false,
            approaches: 0,
            dualGiven: 0,
            dualRecieved: 0,
            route: '',
            to: "",
            from: "",
            remarks: "york on guard",
            approachNames: "",
            intercepting: true,
            ipc: false,
            checkride: false,
            flightReview: false,
            instructorId: -1,
            instructorSignature: undefined
}

const Logbook = (): ReactElement => {
    const logbook: LogbookActions = useLogbook()
    const [displayData, setDisplayData] = useState(undefined)

    const handleClick = (data: LogbookEntry, aircraft: Aircraft): void => {
        setDisplayData({data})
    }

    return (
            <div className="flex flex-col h-full">
                <div className="w-full p-2 m-2">
                    <h1 className="text-3xl font-bold justify-self-start inline-block">My Logbook</h1>
                    <NavLink className='bg-ezblue justify-self-stretch inline-block p-2 rounded-md ml-5' to='/dashboard/logbook/create'>Create New Entry</NavLink>
                </div>

                <div className='flex flex-row h-rvh'>
                    <div className='flex flex-col w-60 overflow-x-hidden overflow-y-auto gap-y-1 h-svh'>
                        {logbook.logbookData ? logbook.logbookData.map((object: LogbookEntry) => <LogbookCard data={object} aircraft={{} as Aircraft} onClick={handleClick}/>) : ''}
                    </div>

                    <div className='w-screen h-fit mx-1 px-2'>
                        {displayData ? <LogbookDisplay data={INITIAL_STATE} aircraft={{tailNumber: 'N41JA', make: 'Piper', model: 'Archer II', type: 'P28A', numberOfEngines: 1, engineType: 'piston'}} /> : ''}
                    </div>
                </div>
            </div>
        
    )
}

export default Logbook