import { ReactElement } from "react"
import { NavLink } from "react-router-dom"

const Logbook = (): ReactElement => {
    return (
            <div className="flex flex-col justify-center items-center p-4">
                <h1 className="text-3xl font-bold w-full">My Logbook</h1>

                <NavLink className='bg-ezblue' to='/dashboard/logbook/create'>Create New Entry</NavLink>
            </div>
        
    )
}

export default Logbook