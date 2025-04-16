
const RecentExperienceListItem: React.FC<Props> = ({lastItem, title, time} : Props) => {
    return (
        <div className={`relative w-full border-t-1 ${lastItem ? 'border-b-1' : ''} py-1 transition hover:bg-gray-300`}>
            <h2 className='font-bold text-lg ml-2'>{title}</h2>

            <div className='absolute right-2 top-0 pt-1 flex flex-row items-center'>
                <h2 className={`font-bold`}>{time}</h2>
            </div>
        </div>  
    )
}

type Props = {
    lastItem?: boolean
    title: string
    time: string | number
}

export default RecentExperienceListItem