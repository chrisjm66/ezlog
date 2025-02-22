import { ReactElement } from "react"
import bg from "/site-background.jpg"
import { Link } from "react-router-dom"

const Login = (): ReactElement => {
    return (
            <form className="flex flex-col place-self-center self-center gap-y-5 w-84 border-2 border-black p-5 m-10 rounded-xl">
            <h1 className="font-bold text-3xl">Log In</h1>
                <div>
                    <label htmlFor='email' className='text-lg'>Email</label><br/>
                    <input title="email" name="email" type='text' className='w-full rounded-sm'/><br/>
                </div>
                

                <div>
                    <label htmlFor='password' className='text-lg'>Password</label><br/>
                    <input title="password" name="password" type='password' className='w-full rounded-sm'/><br/>
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