import { ReactElement } from "react"
import { Link } from "react-router-dom"
const Footer = (): ReactElement => {
    return (
        <div id="footer" className="w-screen absolute bottom-0 h-8 opacity-50 bg-ezgray flex justify-center items-center">
            <h1 className="text-black">Created by Chris Mangan using <Link className="transition hover:text-green-200" to='https://react.dev'>React</Link> & <Link className="transition hover:text-green-200" to='https://nodejs.org/en'>Node.Js</Link></h1>
        </div>
    )
}

export default Footer