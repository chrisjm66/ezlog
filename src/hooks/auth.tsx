import { createContext, ReactElement, useContext, useEffect, useState } from "react"
import { NavigateFunction, Outlet, redirect, useNavigate } from "react-router-dom"
import axios, { AxiosResponse } from "axios"

const AuthContext = createContext({})
const useAuth = (): any => useContext(AuthContext)

// logic for the context provider
const useAuthActions = (): AuthActions => {
    const navigate: NavigateFunction = useNavigate()
    const [loading, setLoading] = useState(true)
    const defaultUser: UserModel = {
        firstName: "",
        lastName: "",
        email: "",
        userId: -1,
        isInstructor: false
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

    const login = async(userData: LoginRequest): Promise<number> => {
        return axios.post("/api/auth/login", 
            userData,
            {headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.status == 200) {
                setUser(response.data)
            }

            return response.status
        }).catch((error) => {

            return error.status
        })
    }

    const logout = async(): Promise<void> => {
        const response = await axios.post("/api/auth/logout", user)
        
        if (response.status == 200) {
            setUser(defaultUser)
            redirect('/')
            
        }

    }
    
    const validate = async(): Promise<any> => {
        axios.get("/api/auth/validate").then((response: AxiosResponse) => {
            setLoading(false)
            if (response.status == 200) {
                return setUser(response.data)
            } else {
                return console.error('Server returned null value while validating user')
            }
        }).catch((err) => {
            setLoading(false)
            console.error(err)
        })
        
        
            
    }
    return {user, signup, login, validate, logout, loading, setLoading}
}

// creates a wrapper for the rest of the app
export const ProvideAuth = ({children}): ReactElement => {
    const auth: AuthActions = useAuthActions()

    useEffect(() => {
        auth.validate()
    }, [])
    
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
        if (!auth.loading && auth.user.userId === -1) {
            navigate('/login')
        }
    }, [auth.loading, auth.user.userId, navigate])
    
    if (auth.loading) {
        return <></>
    }
    
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
    instructorCid?: string
    isInstructor: boolean
    instructorExpiryDate?: string
}

export type AuthActions = {
    user: UserModel
    loading: boolean
    setLoading: (data: boolean) => void
    signup: (userData: RegisterRequest) => void
    login: (userData: LoginRequest) => Promise<number>
    validate: () => void
    logout: () => void
}

export default useAuth