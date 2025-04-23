import { ReactElement } from "react"
import CurrencySummary from "../../components/currency/CurrencySummary"
import RecentExperience from "../../components/experience/RecentExperience"
import useAuth, { AuthActions } from "../../hooks/auth"

const Dashboard = (): ReactElement => {
    const {user}: AuthActions = useAuth()

    return (
            <div className="page-container">
                <div className='w-screen'>
                    <h1 className="font-bold">Dashboard</h1>
                    <h2 className="text-xl pl-5">Welcome, {user.firstName}</h2>
                </div>
                

                <div className='grid-container'>
                    <CurrencySummary/>
                    <RecentExperience/>
                </div>
            </div>
    )
}

export default Dashboard