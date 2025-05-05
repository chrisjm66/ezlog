import { FC, ReactElement } from "react"

const ExperienceCard: FC<Props> = ({title, subtext, onClick}: Props): ReactElement => {
    return (
            <button onClick={() => {onClick()}} className="flex flex-col w-full h-max bg-gray-100 justify-start items-center px-2 py-1 transition hover:bg-gray-200">
                <div className='flex flex-col items-start w-full'>
                    <h2 className='font-bold w-full text-left'>{title}</h2>
                    <h2 >{subtext}</h2>
                </div>
            </button>
    )
}

export default ExperienceCard

type Props = {
    title: string
    subtext?: string
    onClick: () => void
}