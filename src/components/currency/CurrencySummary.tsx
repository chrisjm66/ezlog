import useLogbook, { LogbookActions } from "../../hooks/logbook"
import { calculateAselCurrency, calculateFlightReviewCurrency, calculateIfrCurrency } from "../../services/Currency"
import CurrencyListItem from "./CurrencyListItem"
import { useEffect, useState } from "react"

const CurrencySummary: React.FC = () => {
    const {logbookData}: LogbookActions = useLogbook()
    const [ifrCurrent, setIfrCurrent] = useState<boolean>(false)
    const [dayCurrent, setDayCurrent] = useState<boolean>(false)
    const [nightCurrent, setNightCurrent] = useState<boolean>(false)
    const [flightReviewCurrent, setFlightReviewCurrent] = useState<boolean>(false)

    useEffect(() => {
        const ifr = calculateIfrCurrency(logbookData)
        const asel = calculateAselCurrency(logbookData)
        const flightReview = calculateFlightReviewCurrency(logbookData)

        setIfrCurrent(ifr.current)
        setDayCurrent(asel.dayCurrent)
        setNightCurrent(asel.nightCurrent)
        setFlightReviewCurrent(flightReview.current)
    }, [logbookData])

    return (
        <div className="grid-object">
            <h1 className="font-bold p-0 mb-5">Currency Summary</h1>
            <CurrencyListItem title='IFR' current={ifrCurrent}/>
            <CurrencyListItem title='ASEL - Passengers' current={dayCurrent}/>
            <CurrencyListItem title='ASEL - Passengers (Night)' current={nightCurrent}/>
            <CurrencyListItem title='Flight Review' current={flightReviewCurrent} lastItem/>
        </div>   
    )
}

export default CurrencySummary