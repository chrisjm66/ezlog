import { createContext, ReactElement, useMemo, useContext, useEffect, useState } from "react"
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom"
import axios from "axios"

const AuthContext = createContext({})
const useAuth = (): any => useContext(AuthContext)


// logic for the context provider
const useAuthActions = () => {
    const navigate: NavigateFunction = useNavigate()

    const defaultUser: UserModel = {
        firstName: "",
        lastName: "",
        email: "",
        userId: -1
    }

    const [user, setUser] = useState(defaultUser)

    const signup = async(userData: RegisterRequest): Promise<void> => {
        const response = await axios.post("/api/auth/register", 
            userData,
            {headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log(response.status)
        console.log(response.statusText)
        console.log( response.data)
        if (response.status == 200) {
            setUser(response.data)
            return navigate('/dashboard')
        }
    }

    const login = async(userData: LoginRequest): Promise<void> => {
        const response = await axios.post("/api/auth/login", 
            userData,
            {headers: {
                'Content-Type': 'application/json'
            }
        })
       
        if (response.status == 200) {
            setUser(response.data)
            return navigate('/dashboard')
        }
    }

    const logout = async(): Promise<void> => {
        const response = await axios.post("/api/auth/logout", user)
        
        if (response.status == 200) {
            setUser(defaultUser)
            return navigate('/')
        }

    }
    const validate = async(): Promise<void> => {
        const response = await axios.get("/api/auth/validate")

        if (response) {
            return setUser(response.data)
        } else {
            console.error('Server returned null value while validating user')
            return
        }
            
    }
    return {user, signup, login, validate, logout}
}

// creates a wrapper for the rest of the app
export const ProvideAuth = ({children}): ReactElement => {
    const auth = useAuthActions()

    useMemo(() => auth.validate, [auth])
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export const ProtectedRoute = (): ReactElement => {
    const auth: any = useAuth()
    const navigate: NavigateFunction = useNavigate()

    useEffect(() => {
        if (auth.user.userId === -1) {
            navigate('/login')
        }
    }, [auth.user, navigate])
    
    return (
        <Outlet/>
    )
}

export type RegisterRequest = {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
}

export type LoginRequest = {
    email: string
    password: string
}

export type UserModel = {
    firstName: string
    lastName: string
    email: string
    userId: number
}

export type AuthActions = {
    user: UserModel
    signup: (userData: RegisterRequest) => void
    login: (userData: LoginRequest) => void
    validate: () => void
    logout: () => void
}

export default useAuth