import { FlightReviewCurrencyData } from "../../services/currency"
import DetailListItem from "./DetailListItem"

const FlightReviewCurrencyDetail: React.FC<Props> = ({data}: Props) => {
    if (!data) {
        return (
            <></>
        )
    }

    return (
        <div className='grid-object'>
            <h1 className='p-0 mb-5'>Flight Review</h1>

            <div>
                <h2 className='text-lg'>Within previous 24 calendar months:</h2>
                <DetailListItem title='Flight Review' lastItem checked={data.flightReviewInLast24}/>
                <h2 className='text-lg'>OR</h2>
                <DetailListItem title='Checkride' lastItem checked={data.checkrideInLast24}/>
            </div>

            <div className='mt-2'>
                
            </div>
            
            <div>
                <h2 className='text-xl mt-5'>
                    You are 
                    <b className={data.current ? `text-ezgreen` : `text-ezred`}>
                        {data.current ? ' current' : ' current'}
                    </b>
                    .
                </h2>
            </div>
        </div>
    )
}

type Props = {
    data?: FlightReviewCurrencyData
}

export default FlightReviewCurrencyDetail