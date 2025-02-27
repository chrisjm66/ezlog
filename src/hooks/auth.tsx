import { createContext, ReactElement, useMemo, useContext, useEffect, useState } from "react"
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom"
import axios from "axios"

const AuthContext: React.Context<any> = createContext({})
const useAuth = () => useContext(AuthContext)


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

        console.log(response)
        console.log(response.statusText)

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
    const validate = (): void => {
        axios.get("/api/auth/validate")
        .then(response => {
            console.log(response)
            setUser(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }
    return {user, signup, login, validate, logout}
}

// creates a wrapper for the rest of the app
export const ProvideAuth = ({children}: any) => {
    const auth: any = useAuthActions()

    useEffect(() => auth.validate, [auth.user])
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export const ProtectedRoute = () => {
    const auth = useAuth()
    const navigate: NavigateFunction = useNavigate()

    useEffect(() => {
        if (auth.user.userId === -1) {
            navigate('/login')
        }
    }, [auth])
    
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

export default useAuth
