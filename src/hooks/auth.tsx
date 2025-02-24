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

    return {user, signup}
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

export default useAuth