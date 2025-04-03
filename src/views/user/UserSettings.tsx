import React, { ReactNode } from "react";
import InstructorSettings from "../../components/user/InstructorSettings";

const UserSettings: React.FC = (): ReactNode => {
    return (
        <div className="flex flex-col justify-center items-center p-5 z-10">
            <h1 className="text-4xl font-bold w-screen pl-5">User Settings</h1>

            <InstructorSettings/>
        </div>
    )
}

export default UserSettings