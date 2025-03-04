import { createContext, ReactElement, useContext, useEffect, useMemo, useState } from "react"
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom"
import axios, { AxiosResponse } from "axios"

const AuthContext = createContext({})
const useAuth = (): any => useContext(AuthContext)

// logic for the context provider
const useAuthActions = () => {
    const navigate: NavigateFunction = useNavigate()
    const [loading, setLoading] = useState(true)
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
    return {user, signup, login, validate, logout, loading, setLoading}
}

// creates a wrapper for the rest of the app
export const ProvideAuth = ({children}): ReactElement => {
    const auth = useAuthActions()

    useEffect(() => auth.validate, [])
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export const ProtectedRoute = (): ReactElement => {
    const auth: any = useAuth()
    const navigate: NavigateFunction = useNavigate()

    useMemo(() => {
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

export type AuthActions = {
    user: UserModel
    signup: (userData: RegisterRequest) => void
    login: (userData: LoginRequest) => void
    validate: () => void
    logout: () => void
}

export default useAuth