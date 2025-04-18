import { ReactElement } from "react"
import CurrencySummary from "../../components/currency/CurrencySummary"
import RecentExperience from "../../components/experience/RecentExperience"
import useAuth, { AuthActions } from "../../hooks/auth"

const Dashboard = (): ReactElement => {
    const {user}: AuthActions = useAuth()

    return (
            <div className="flex flex-col justify-center items-center p-5 z-10">
                <div className='w-screen'>
                    <h1 className="text-4xl font-bold ">Dashboard</h1>
                    <h2 className="pl-5 text-xl">Welcome, {user.firstName}</h2>
                </div>
                

                <div className='grid-container'>
                    <CurrencySummary/>
                    <RecentExperience/>
                </div>
            </div>
    )
}

export default Dashboard