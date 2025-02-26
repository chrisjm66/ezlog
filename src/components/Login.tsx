//@ts-nocheck
import { ReactElement, useState } from "react"
import { Link, redirect } from "react-router-dom"
import { useFormStatus } from "react-dom"
import useAuth, { LoginRequest } from "../hooks/auth"

const Login = (): ReactElement => {
    const auth = useAuth()
    const status = useFormStatus()
    const [formValid, setFormValid] = useState(true)
    const handleChange = (e) => {
        
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const formData: FormData = new FormData(e.target)
        const userData: LoginRequest = {
            email: formData.get('email'),
            password: formData.get('password')
        }

        if (auth.user.userId === -1) {
            auth.login(userData)
        }  
    }

    return (
            <form className="flex flex-col place-self-center self-center gap-y-5 w-84 border-2 border-black p-5 m-10 rounded-xl" onSubmit={handleSubmit}>
            <h1 className="font-bold text-3xl">Log In</h1>
                <div>
                    <label htmlFor='email' className='text-lg'>Email</label><br/>
                    <input required title="email" name="email" type='text' className='w-full rounded-sm'/><br/>
                </div>
                

                <div>
                    <label htmlFor='password' className='text-lg'>Password</label><br/>
                    <input required title="password" name="password" type='password' className='w-full rounded-sm'/><br/>
                </div>

                <div className='flex flex-col items-center mt-5'>
                    <button type='submit' className='bg-ezblue text-white text-xl w-max px-8 py-1 rounded-md hover:bg-blue-500 transition-all'>
                        Log In
                    </button>

                    <p className='mt-2 italic text-lg'>Already have an account? <Link to='/login' className="text-ezblue hover:text-blue-500 transition-all">Log in here!</Link></p>
                </div>
                
            </form>
    )
}

export default Login