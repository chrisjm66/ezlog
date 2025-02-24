import { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const AuthContext = createContext('s')
const useAuth = () => useContext(AuthContext)

// logic for the context provider
const useAuthActions = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    const signup = async(userData: RegisterRequest) => {
        const response = await axios.post("/api/auth/register", 
            userData,
            {headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log(response.status)
        console.log(response.statusText)

        if (response.status == 200) {
            return navigate('/')
        }
    }

    const login = async(userData: LoginRequest) => {
        const response = await axios.post("/api/auth/login", 
            userData,
            {headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log(response)
        console.log(response.statusText)

        if (response.status == 200) {
            console.log('login success')
            console.log(response)
            return navigate('/')
        }
    }
    return {user, signup, login}
}

// creates a wrapper for the rest of the app
export const ProvideAuth = ({children}: any) => {
    const auth: any = useAuthActions()
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
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

export default useAuth