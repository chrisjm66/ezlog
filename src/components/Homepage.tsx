import { ReactElement } from "react"
import bg from "../../public/site-background.jpg"
import { Link } from "react-router-dom"

const Homepage = (): ReactElement => {
    return (
        <div id="home" className="absolute top-0 w-screen h-screen flex justify-center items-center">
            <img src={bg} alt='background' className="absolute top-0 w-screen h-screen object-cover object-bottom blur-md z-0"/>
            <div className="flex justify-center z-10">
                <h1 className="text-9xll font-bold">The logging solution for pilots</h1>
            </div>
        </div>
        
    )
}

export default Homepage