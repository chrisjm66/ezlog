//@ts-nocheck
import { ReactElement, useState } from "react"
import { Link, redirect } from "react-router-dom"
import { useFormStatus } from "react-dom"
import axios from "axios"
import useAuth, { RegisterRequest } from "../hooks/auth"

const Signup = (): ReactElement => {
    const auth = useAuth()
    const status = useFormStatus()
    const [formValid, setFormValid] = useState(true)
    const handleChange = (e) => {
        
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const formData: FormData = new FormData(e.target)
        const userData: RegisterRequest = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        }
        
        if (!auth.user) {
            auth.signup(userData)
        }  
    }
    return (
            <form 
            className="flex flex-col place-self-center self-center gap-y-5 w-84 border-2 border-black p-5 m-10 rounded-xl"
            onSubmit={handleSubmit}
            >
            <h1 className="font-bold text-3xl">Sign Up</h1>
                <div>
                    <label htmlFor='firstName' className='text-lg'>First Name</label><br/>
                    <input required title="firstName" name="firstName" type='text' className='w-full rounded-sm'/><br/>
                </div>
                
                <div>
                    <label htmlFor='lastName' className='text-lg'>Last Name</label><br/>
                    <input required title="lastName" name="lastName" type='text' className='w-full rounded-sm'/><br/>
                </div>
                
                <div>
                    <label htmlFor='email' className='text-lg'>Email</label><br/>
                    <input required title="email" name="email" type='text' className='w-full rounded-sm'/><br/>
                </div>

                <div>
                    <label htmlFor='password' className='text-lg'>Password</label><br/>
                    <input required minLength={8} placeholder="Must be at least 8 characters" title="password" name="password" type='password' className='w-full rounded-sm'/><br/>
                </div>

                <div>
                    <label htmlFor='confirmPassword' className='text-lg'>Confirm Password</label><br/>
                    <input required title="confirmPassword" name="confirmPassword" type='password' className='w-full rounded-sm'
                    /><br/>
                </div>

                <div className='flex flex-col items-center mt-5'>
                    <button type='submit' disabled={status.pending || !formValid} className='bg-ezblue text-white text-xl w-max px-8 py-1 rounded-sm hover:bg-blue-500 transition-all'>
                        Sign Up
                    </button>

                    <p className='mt-2 italic text-lg'>Don't have an account? <Link to='/signup' className="text-ezblue hover:text-blue-500 transition-all">Sign up here!</Link></p>
                </div>
                
            </form>
    )
}

export default Signup