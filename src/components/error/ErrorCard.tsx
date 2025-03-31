import React from "react";

const ErrorCard: React.FC<Props> = ({header, subtext, hidden}: Props) => {
    return (
        <div hidden={hidden} className='w-screen h-10 bg-red-300 flex justify-center items-center'>
            <h2 className='font-bold mr-10'>{header}</h2>
            <h2>{subtext}</h2>
        </div>
    )
}

export default ErrorCard

type Props = {
    hidden: boolean
    header: string
    subtext: string
}