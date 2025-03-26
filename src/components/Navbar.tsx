import { ReactElement } from "react"
import logo from "../assets/ezlog-full-white.png"
import { Link, NavLink } from "react-router-dom"
import useAuth from "../hooks/auth"
import { Icon } from "@iconify/react/dist/iconify.js"

const styleNavLink = ({isActive}: any): string => {
    return "text-2xl transition transition-all hover:text-green-200 " + (isActive ? "text-amber-200" : "text-white")
}

const AccountDropdown = (): ReactElement => {
    const {user, logout} = useAuth()

    const instructorNavLink = (): ReactElement => {
        return (
            <NavLink to='dashboard/instructor' className={styleNavLink}>
                Instructor
            </NavLink>
        )
    }
    return (
        <div className="flex-row flex items-center gap-x-10 absolute right-10">
            

            <NavLink to='/dashboard' className={styleNavLink}>
                    Dashboard
            </NavLink>

            <NavLink to='/dashboard/logbook' className={styleNavLink}>
                    Logbook
            </NavLink>

            <NavLink to='/dashboard/aircraft' className={styleNavLink}>
                    Aircraft
            </NavLink>

            {user.isInstructor ? instructorNavLink() : null}
            <div className='flex flex-row items-center gap-x-4'>
                <Icon icon="mdi:person" width={40} className="text-white text-2xl"/>
                <NavLink to='/settings' className="text-white font-semibold text-2xl">{`${user.firstName} ${user.lastName}`}</NavLink>
            </div>
            
            <NavLink to='/' className="text-white text-2xl" onClick={logout}>
                Log Out
            </NavLink>
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
        <div id="navbar" className="bg-ezblue w-screen h-15 flex justify-left items-center relative z-20">
            <Link to='/' className="h-full p-2">
                <img src={logo} alt='logo' className="h-full"/>
            </Link>
            
            {user.userId === -1 ? <InitialUserOptions/> : <AccountDropdown/>}
        </div>
    )
}

export default Navbar