import { ReactElement } from "react"
import bg from "/site-background.jpg"
import { Link } from "react-router-dom"

const Homepage = (): ReactElement => {
    return (
        <div id="home" className="absolute top-0 w-screen h-screen flex justify-center items-center">
            <img src={bg} alt='background' className="absolute top-0 w-screen h-screen object-cover object-bottom blur-md z-0"/>
            <div className="flex flex-col justify-center z-10">
                <h1 className="text-white text-4xl font-bold">The <span className="text-ezblue">ez</span> logging solution for pilots and instructors</h1>

                <div className="text-center flex justify-center items-center flex-col m-5">
                    <h2 className="text-3xl py-1 border-y-1 w-72 text-white">Logbook Validation</h2>
                    <h2 className="text-3xl py-1 border-y-1 w-72 text-white">Currency Reports</h2>
                    <h2 className="text-3xl py-1 border-y-1 w-72 text-white">Instructor Signoffs</h2>


                    <div className='mt-10'>
                        <Link to='/signup' className='text-white bg-ezblue text-xl p-2 px-4 rounded-md hover:bg-blue-500 transition-all duration-200'>
                            Get Started
                        </Link>

                        <p className='text-white mt-2 italic text-lg'>Already have an account? <Link to='/login' className="text-ezblue hover:text-blue-500 transition-all">Log in here!</Link></p>
                    </div>
                </div>

                
            </div>
        </div>
        
    )
}

export default Homepage