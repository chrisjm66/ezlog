import { IFRCurrencyData } from "../../services/currency";
import DetailListItem from "./DetailListItem";

const IFRCurrencyDetail: React.FC<Props> = ({data}: Props) => {
    if (!data) {
        return <></>
    }

    return (
        <div className='grid-object'>
            <h1 className='p-0 mb-5'>IFR</h1>

            <div>
                <h2 className='text-lg'>Within 6 calendar months:</h2>
                <DetailListItem title={`${data.approaches}/6 Approaches`} checked={data.approaches >= 6}/>
                <DetailListItem title='Holding' checked={data.holding}/>
                <DetailListItem title='Intercepting & Tracking Courses' checked={data.intercepting} lastItem/>
            </div>
            
            <h2 className='text-xl mt-5'>
                You are 
                <b className={data.current ? `text-ezgreen` : `text-ezred`}>
                    {data.current ? ' current' : ' not current'}
                </b>
                .
            </h2>
        </div>
    )
}

type Props = {
    data?: IFRCurrencyData
}

export default IFRCurrencyDetail