import React, { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
const InstructorPanel: React.FC = (): ReactNode => {

    return (
        <div className="flex flex-col h-full">
            <div className="w-full m-2">
                <h1 className="text-3xl font-bold justify-self-start inline-block">My Logbook</h1>
                <NavLink className='bg-ezblue justify-self-stretch inline-block p-2 rounded-md ml-5' to='/dashboard/logbook/create'>Create New Entry</NavLink>
            </div>

            <div className='flex flex-row h-rvh'>
                <div className='flex flex-col w-60 overflow-x-hidden overflow-y-auto gap-y-1 h-svh'>
                </div>

                <div className='w-screen h-fit mx-1 px-2'>
            
                </div>
            </div>
        </div>

    )
}

export default InstructorPanel