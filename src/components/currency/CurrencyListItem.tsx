import { Icon } from "@iconify/react/dist/iconify.js"

const CurrencyListItem: React.FC<Props> = ({lastItem, title, current, daysCurrentFor} : Props) => {
    return (
        <div className={`relative w-full border-t-1 ${lastItem ? 'border-b-1' : ''} py-1 transition hover:bg-gray-300`}>
            <h2 className='font-bold text-sm lg:text-lg ml-2'>{title}</h2>

            <div className='absolute right-2 top-0 pt-1 flex flex-row items-center'>
                {current ? <Icon icon='mdi:check-circle' width={25} className='text-ezgreen mx-2'/> : <Icon icon='mdi:alpha-x-circle' width={25} className='text-ezred mx-2'/>}
                <h2 className={`${current ? 'text-ezgreen' : 'text-ezred'} font-bold text-sm lg:text-lg`}>
                    {current ? 'Current' : 'Not Current'}
                    {current && daysCurrentFor ? ` for ${daysCurrentFor} days` : ''}
                </h2>
            </div>
        </div>  
    )
}

type Props = {
    lastItem?: boolean
    title: string
    current?: boolean
    daysCurrentFor?: number
}

export default CurrencyListItem