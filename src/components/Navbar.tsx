import { ReactElement } from "react"
import logo from "../assets/ezlog-full-white.png"
import { Link, NavLink } from "react-router-dom"
import useAuth, { UserModel } from "../hooks/auth"
import { Icon } from "@iconify/react/dist/iconify.js"

const styleNavLink = ({isActive, isPending}): string => {
    return "text-3xl transition transition-all hover:text-green-200 " + (isActive ? "text-amber-200" : "text-white")
}

const AccountDropdown = (): ReactElement<any> => {
    const {user, logout} = useAuth()

    return (
        <div className="flex-row flex items-center gap-x-10 absolute right-10">
            <NavLink to='/dashboard' className={styleNavLink}>
                    Dashboard
            </NavLink>

            <div className='flex flex-row items-center gap-x-4'>
                <Icon icon="mdi:person" width={50} className="text-white text-3xl"/>
                <h1 className="text-white font-semibold text-3xl">{`${user.firstName} ${user.lastName}`}</h1>
            </div>
            
            <button type='button' className="text-white text-3xl" onClick={logout}>
                Log Out
            </button>
        </div>
    )
}

const InitialUserOptions = (): ReactElement => {
    return (
        <div className="flex-row flex gap-x-10 absolute right-10">
            <NavLink to='/login' className={styleNavLink}>
                    Log In
            </NavLink>

            <NavLink to='/signup' className={styleNavLink}>
                    Sign Up
            </NavLink>
        </div>
    )
}

const Navbar = (): ReactElement => {
    const {user} = useAuth()
    return (
        <div id="navbar" className="bg-ezblue w-screen h-20 flex justify-left items-center relative z-20">
            <Link to='/' className="h-full p-2">
                <img src={logo} alt='logo' className="h-full"/>
            </Link>

            {user.userId === -1 ? <InitialUserOptions/> : <AccountDropdown/>}
        </div>
    )
}

export default Navbar