import { Outlet } from "react-router-dom"
import { ProvideAircraft } from "../hooks/aircraft"
import { ProvideLogbook } from "../hooks/logbook"


const ContextProvider = () => {
    return (
        <ProvideLogbook>
            <ProvideAircraft>
                <Outlet/>
            </ProvideAircraft>
        </ProvideLogbook>
    )
}

export default ContextProvider