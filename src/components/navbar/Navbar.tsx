import { ReactElement, useEffect, useState } from "react"
import logo from "../../assets/ezlog-full-white.png"
import { Link, NavLink, useLocation } from "react-router-dom"
import useAuth, { UserModel } from "../../hooks/auth"
import PrimaryNavLinks from "./PrimaryNavlinks"
import { Icon } from "@iconify/react/dist/iconify.js"

const Logo: React.FC<LocalProps> = ({user}: LocalProps) => {
    return (
        <Link to={user.userId === -1 ? '/' : '/dashboard'} className="h-full p-2">
            <img src={logo} alt='logo' className="h-full"/>
        </Link>
    )
}

const Hamburger = ({children}) => {
    const [linksVisible, setLinksVisible] = useState<boolean>(false)
    const location = useLocation()

    const toggleHamburger = () => {
        setLinksVisible(!linksVisible)
    }

    // hides navbar on path change
    useEffect(() => {
        setLinksVisible(false)
    }, [setLinksVisible, location.pathname])

    return (
        <>
            <button type='button' onClick={toggleHamburger} className='absolute right-5 h-full z-10 text-white'>
                <Icon icon='mdi:menu'/>
            </button>

            <div className="mobile-nav-container" hidden={!linksVisible}>
                {children}
            </div>
        </>  
    )
}


const InitialUserOptions = () => {
    return (
        <>
            <NavLink to='/login' className='nav-link'>
                    Log In
            </NavLink>

            <NavLink to='/signup' className='nav-link'>
                    Sign Up
            </NavLink>
        </>
    )
}

const DesktopNavbar = ({user}: LocalProps) => {
    return (
        <div id="navbar" className="bg-ezblue w-screen h-8 lg:h-15 flex justify-left items-center relative z-20">
            <Logo user={user}/>
            
            <div className="flex-row flex items-center gap-x-10 absolute right-10">
                {user.userId === -1 ? <InitialUserOptions/> : <PrimaryNavLinks/>}
            </div>
        </div>
    )
}

const MobileNavbar = ({user}: LocalProps) => {
    return (
        <div id="navbar" className="bg-ezblue w-screen h-10 lg:h-15 flex flex-col justify-left items-center relative z-20">
            <Logo user={user}/>

            <Hamburger>
                {user.userId === -1 ? <InitialUserOptions/> : <PrimaryNavLinks/>}
            </Hamburger>
        </div>
    )
}

const Navbar = (): ReactElement => {
    const {user} = useAuth()
    const [isMobile, setMobile] = useState<boolean>(false)

    const handleResize = () => {
        setMobile(window.innerWidth < 1600)
    }

    useEffect(() => {
        handleResize()

        window.addEventListener("resize", handleResize);
    })

    return (
        isMobile ? <MobileNavbar user={user}/> : <DesktopNavbar user={user}/>
    )
}

export default Navbar

type LocalProps = {
    user: UserModel
}