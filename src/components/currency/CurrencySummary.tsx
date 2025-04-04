import { Icon } from "@iconify/react/dist/iconify.js"
import CurrencyListItem from "./CurrencyListItem"

const CurrencySummary: React.FC = () => {
    return (
            <div className="grid-object">
                <h1 className="font-bold p-0 mb-5">Currency Summary</h1>

                <CurrencyListItem title='IFR'/>
                <CurrencyListItem title='ASEL - Passengers'/>
                <CurrencyListItem title='ASEL - Passengers (Night)'/>
                <CurrencyListItem title='Flight Review' lastItem/>
            </div>
        
    )
}

export default CurrencySummary