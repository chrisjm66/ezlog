import { ReactElement, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import AircraftCard from "../components/AircraftCard"
import AircraftDisplay from "../components/AircraftDisplay"
import useAircraft, { Aircraft, AircraftActions } from "../hooks/aircraft"

const AircraftView = (): ReactElement => {
    const {aircraftData}: AircraftActions = useAircraft()
    const [displayData, setDisplayData] = useState<Aircraft | undefined>(undefined)

    const handleClick = (data: Aircraft): void => {
        setDisplayData(data)
    }

    useEffect(() => {
        if (aircraftData) {
            console.log(aircraftData)
        }
        
    }, [aircraftData])

    const List = () => {
        return (
            <div className='flex flex-row h-rvh'>
                <div className='flex flex-col w-60 overflow-x-hidden overflow-y-auto gap-y-1 h-svh'>
                    {aircraftData.map((object: Aircraft) => <AircraftCard data={object} aircraft={{} as Aircraft} onClick={handleClick} key={object.aircraftId}/>)}
                </div>
    
                <div className='w-screen h-fit mx-1 px-2'>
            
                    {displayData ? <AircraftDisplay data={displayData} />: ''}
                </div>
            </div>
        )
    }

    return (
            <div className="flex flex-col h-full">
                <div className="w-full p-2 m-2">
                    <h1 className="text-3xl font-bold justify-self-start inline-block">My Aircraft</h1>
                    <NavLink className='bg-ezblue justify-self-stretch inline-block p-2 rounded-md ml-5' to='/dashboard/aircraft/create'>Create New Aircraft</NavLink>
                </div>

                {aircraftData?.length > 0 ? <List/> : <h1 className='p-5'>No Aircraft Added</h1>}
            </div>
        
    )
}
export default AircraftView