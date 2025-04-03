import { ReactElement } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
//import Footer from "../views/Footer"
import { ToastContainer } from "react-toastify"

const Layout = (): ReactElement => {
    return (
        <div id="layout-container" className="relative bg-white min-h-screen">
            <Navbar/>

            <Outlet/>

            {/*<Footer/>*/}
            <ToastContainer
                position='bottom-right'
                autoClose={5000}
                theme={'light'}
            />
        </div>
    )
}

export default Layout