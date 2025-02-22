import { ReactElement } from "react"
import logo from "../../public/ezlog-full-white.png"
import { Link } from "react-router-dom"

const Navbar = (): ReactElement => {
    return (
        <div id="navbar" className="bg-ezblue w-screen h-20 flex justify-left items-center relative z-20">
            <Link to='/' className="h-full p-2">
                <img src={logo} alt='logo' className="h-full"/>
            </Link>

            <div className="flex-row flex gap-x-10 absolute right-10">
                <Link to='/signup'>
                    <h2 className="text-white text-3xl">
                        Sign Up
                    </h2>
                </Link>

                <Link to='/login'>
                    <h2 className="text-white text-3xl">
                        Log In
                    </h2>
                </Link>
            </div>
        </div>
    )
}

export default Navbar