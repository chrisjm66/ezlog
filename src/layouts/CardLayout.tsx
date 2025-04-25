import { JSX } from 'react'
import { NavLink } from 'react-router-dom'

const CardLayout: React.FC<Props> = ({title, buttonText, buttonHref, baseRoute, ListObjects, WindowDisplay}) => {
    return (
        <div className="flex flex-col h-full">
            <div className="w-full p-2 flex flex-col lg:flex-row lg:items-center gap-y-2">
                <h1 className="inline-block">{title}</h1>
                {buttonText ? <NavLink className='bg-ezblue justify-self-stretch inline-block p-2 rounded-md ml-5 h-max' to={buttonHref || ''}>{buttonText}</NavLink> : null}
                <NavLink to={baseRoute || '/dashboard'} className='bg-ezblue justify-self-stretch inline-block p-2 rounded-md ml-5 lg:hidden'>Back</NavLink>
            </div>

            <div className='flex flex-row h-rvh'>
                <div className='flex flex-col w-70 lg:w-60 overflow-x-hidden overflow-y-auto gap-y-1 h-svh'>
                    {ListObjects}
                </div>

                <div className='w-screen h-fit mx-1 px-2'>
                    {WindowDisplay}
                </div>
            </div>
        </div>
    )
}

type Props = {
    title: string
    buttonText?: string
    buttonHref?: string
    baseRoute?: string
    ListObjects: JSX.Element | null
    WindowDisplay: JSX.Element | null
}
export default CardLayout