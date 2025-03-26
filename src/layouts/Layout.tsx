import { ReactElement } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../views/Footer"

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