import { ReactElement } from "react"
import CurrencySummary from "./CurrencySummary"
import { ProvideLogbook } from "../hooks/logbook"

const Dashboard = (): ReactElement => {
    return (
        <ProvideLogbook>
            <div className="flex flex-col justify-center items-center p-5 z-10">
                <h1 className=" text-4xl font-bold w-screen pl-5">Dashboard</h1>

                <CurrencySummary/>
            </div>
        </ProvideLogbook>
            
        
    )
}

export default Dashboard