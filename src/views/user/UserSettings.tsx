import React, { ReactNode } from "react";
import InstructorSettings from "../../components/user/InstructorSettings";
import UserOptions from "../../components/user/UserSettings";

const UserSettings: React.FC = (): ReactNode => {
    return (
        <div className="flex flex-col justify-center items-center p-5 z-10">
            <h1 className="text-4xl font-bold w-screen pl-5">User Settings</h1>

            <div className='flex flex-col gap-y-5 w-full'>
                <UserOptions/>
                <InstructorSettings/>
            </div>

        </div>
    )
}

export default UserSettings