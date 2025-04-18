import { ASELCurrencyData } from "../../services/currency";
import DetailListItem from "./DetailListItem";

const ASELCurrencyDetail: React.FC<Props> = ({data}: Props) => {
    if (!data) {
        return <></>
    }

    return (
        <div className='grid-object'>
            <h1 className='p-0 mb-5'>Airplane Single Engine</h1>

            <div>
                <h2 className='text-lg font-bold'>Daytime</h2>
                <h2 className='text-lg'>Within previous 90 days:</h2>
                <DetailListItem title={`${data.dayLandings}/3 Landings`} checked={data.dayCurrent}/>
            </div>

            <div className='mt-2'>
                <h2 className='text-lg font-bold'>Nighttime</h2>
                <h2 className='text-lg'>Within previous 90 days:</h2>
                <DetailListItem title={`${data.nightLandings}/3 Night Landings`} checked={data.nightCurrent}/>
            </div>
            
            <div>
                <h2 className='text-xl mt-5'>
                    You are 
                    <b className={data.dayCurrent ? `text-ezgreen` : `text-ezred`}>
                        {data.dayCurrent ? ' day current' : ' not day current'}
                    </b>
                    .
                </h2>
                <h2 className='text-xl'>
                    You are 
                    <b className={data.nightCurrent ? `text-ezgreen` : `text-ezred`}>
                        {data.nightCurrent ? ' night current' : ' not night current'}
                    </b>
                    .
                </h2>
            </div>
        </div>
    )
}

type Props = {
    data?: ASELCurrencyData
}

export default ASELCurrencyDetail