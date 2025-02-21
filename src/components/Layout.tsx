import { ReactElement } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

const Layout = (): ReactElement => {
    return (
        <div id="layout-container" className="bg-white h-screen relative">
            <Navbar/>

            <Outlet/>
        </div>
    )
}

export default Layout