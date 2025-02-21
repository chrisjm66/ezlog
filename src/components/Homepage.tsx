import { ReactElement } from "react"
import bg from "../../public/site-background.jpg"
import { Link } from "react-router-dom"

const Homepage = (): ReactElement => {
    return (
        <div id="home" className="absolute top-0 w-screen h-screen flex justify-center items-center">
            <img src={bg} alt='background' className="absolute top-0 w-screen h-screen object-cover object-bottom blur-md z-0"/>
            <div className="flex flex-col justify-center z-10">
                <h1 className="text-9xll font-bold">The <span className="text-ezblue">ez</span> logging solution for pilots and instructors</h1>

                <div className="text-center flex justify-center items-center flex-col m-5">
                    <h2 className="text-3xl py-1 border-y-1 w-72">Logbook Validation</h2>
                    <h2 className="text-3xl py-1 border-y-1 w-72">Currency Reports</h2>
                    <h2 className="text-3xl py-1 border-y-1 w-72">Instructor Signoffs</h2>


                    <div className='mt-10'>
                        <Link to='/login' className='bg-ezblue text-white no-underline'>
                            Get Started
                        </Link>
                    </div>
                </div>

                
            </div>
        </div>
        
    )
}

export default Homepage