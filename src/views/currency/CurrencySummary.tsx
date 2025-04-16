import useLogbook, { LogbookActions } from "../../hooks/logbook"
import { useState, useEffect } from "react"
import { ASELCurrencyData, calculateAselCurrency, calculateFlightReviewCurrency, calculateIfrCurrency, FlightReviewCurrencyData, IFRCurrencyData } from "../../services/currency"
import IFRCurrencyDetail from "../../components/currency/IFRCurrencyDetail"
import ASELCurrencyDetail from "../../components/currency/AselCurrencyDetail"

const CurrencyView: React.FC = () => {
    const {logbookData}: LogbookActions = useLogbook()
    const [ifrCurrent, setIfrCurrent] = useState<IFRCurrencyData>()
    const [aselData, setAselData] = useState<ASELCurrencyData>()
    const [flightReviewCurrent, setFlightReviewCurrent] = useState<FlightReviewCurrencyData>()

    useEffect(() => {
        const ifr = calculateIfrCurrency(logbookData)
        const asel = calculateAselCurrency(logbookData)
        const flightReview = calculateFlightReviewCurrency(logbookData)

        setIfrCurrent(ifr)
        setAselData(asel)
        setFlightReviewCurrent(flightReview)
    }, [logbookData])

    return (
        <div className="flex flex-col justify-center items-center p-5 z-10">
            <h1 className="text-4xl font-bold w-screen pl-5">Currency</h1>

            <div className='grid-container'>
                <IFRCurrencyDetail data={ifrCurrent}/>
                <ASELCurrencyDetail data={aselData}/>
            </div>
        </div>
    )
}

export default CurrencyView