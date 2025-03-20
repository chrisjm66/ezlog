import { ReactElement } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout = (): ReactElement => {
    return (
        <div id="layout-container" className="relative bg-white min-h-screen">
            <Navbar/>

            <Outlet/>

            {/*<Footer/>*/}
        </div>
    )
}

export default Layout