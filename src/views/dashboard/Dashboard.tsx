import { ReactElement } from "react"
import CurrencySummary from "../../components/currency/CurrencySummary"

const Dashboard = (): ReactElement => {
    return (
            <div className="flex flex-col justify-center items-center p-5 z-10">
                <h1 className="text-4xl font-bold w-screen pl-5">Dashboard</h1>

                <div className='grid-container'>
                    <CurrencySummary/>
                </div>
            </div>
    )
}

export default Dashboard