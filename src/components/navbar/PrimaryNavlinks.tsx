import { Icon } from "@iconify/react/dist/iconify.js"
import { NavLink } from "react-router-dom"
import useAuth from "../../hooks/auth"

const PrimaryNavLinks = () => {
    const {user, logout} = useAuth()

    const instructorNavLink = () => {
        return (
            <NavLink to='dashboard/instructor' className='nav-link'>
                Instructor
            </NavLink>
        )
    }
    return (
        <>
            <NavLink to='/dashboard' className='nav-link'>
                    Dashboard
            </NavLink>

            <NavLink to='/dashboard/logbook' className='nav-link'>
                    Logbook
            </NavLink>

            <NavLink to='/dashboard/aircraft' className='nav-link'>
                    Aircraft
            </NavLink>

            <NavLink to='/dashboard/currency' className='nav-link'>
                    Currency
            </NavLink>

            <NavLink to='/dashboard/experience' className='nav-link'>
                    Experience
            </NavLink>

            {user.isInstructor ? instructorNavLink() : null}
            <div className='flex flex-row items-center gap-x-4'>
                <Icon icon="mdi:person" width={40} className="text-white text-2xl"/>
                <NavLink to='/settings' className='nav-link'>{`${user.firstName} ${user.lastName}`}</NavLink>
            </div>
            
            <NavLink to='/' className='nav-link' onClick={logout}>
                Log Out
            </NavLink>
        </>
    )
}

export default PrimaryNavLinks