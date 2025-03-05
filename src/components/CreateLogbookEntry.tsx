import { ReactElement } from "react"


const INPUT_CLASSNAME = 'p-2 w-full bg-white rounded-sm'
const LABEL_CLASSNAME = 'text-xl mb-2'
const CurrencySummary = (): ReactElement => {
    return (
            <div className="flex flex-col justify-center items-center p-5">
                <h1 className="text-2xl font-bold w-full mb-5">Create Logbook Entry</h1>

                <form className="w-screen flex justify-center">
                    <div className="flex flex-wrap bg-gray-300 p-5 rounded-xl gap-x-5 w-3/4 h-3/4">
                        <h1 className="text-xl font-bold w-full mb-5">GENERAL INFO</h1>

                        <div className="flex flex-col">
                            <label className={LABEL_CLASSNAME}>Date</label>
                            <input type="date" placeholder="today" className={INPUT_CLASSNAME}/>
                        </div>

                        <div className="flex flex-col">
                            <label className={LABEL_CLASSNAME}>Date</label>
                            <input type="date" placeholder="today" className={INPUT_CLASSNAME}/>
                        </div>
                        
                        <div className="flex flex-col">
                            <label className={LABEL_CLASSNAME}>Date</label>
                            <input type="date" placeholder="today" className={INPUT_CLASSNAME}/>
                        </div>
                        
                        <div className="flex flex-col">
                            <label className={LABEL_CLASSNAME}>Date</label>
                            <input type="date" placeholder="today" className={INPUT_CLASSNAME}/>
                        </div>
                        
                        <div className="flex flex-col">
                            <label className={LABEL_CLASSNAME}>Date</label>
                            <input type="date" placeholder="today" className={INPUT_CLASSNAME}/>
                        </div>
                        
                        <div className="flex flex-col">
                            <label className={LABEL_CLASSNAME}>Date</label>
                            <input type="date" placeholder="today" className={INPUT_CLASSNAME}/>
                        </div>
                        
                        <div className="flex flex-col">
                            <label className={LABEL_CLASSNAME}>Date</label>
                            <input type="date" placeholder="today" className={INPUT_CLASSNAME}/>
                        </div>
                    </div>
                </form>
            </div>
        
    )
}

export default CurrencySummary