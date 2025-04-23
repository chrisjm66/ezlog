import { Icon } from "@iconify/react/dist/iconify.js"

const DetailListItem: React.FC<Props> = ({title, checked, lastItem}: Props) => {
    return (
            <div className={`relative w-full border-t-1 ${lastItem ? 'border-b-1' : ''} py-1 transition hover:bg-gray-300`}>
                <h2 className='font-bold text-sm lg:text-lg ml-2'>{title}</h2>
    
                <div className='absolute right-2 top-0 pt-1 flex flex-row items-center'>
                    {checked ? <Icon icon='mdi:check-circle' width={25} className='text-ezgreen mx-2'/> : <Icon icon='mdi:alpha-x-circle' width={25} className='text-ezred mx-2'/>}
                </div>
            </div>  
        )
}

type Props = {
    title: string
    checked: boolean
    lastItem?: boolean
}

export default DetailListItem