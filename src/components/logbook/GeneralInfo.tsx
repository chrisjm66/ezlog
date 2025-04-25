import React from "react";
import { LogbookEntry } from "../../hooks/logbook";
import TextInputComponent from "../../components/input/TextInputComponent";
import NumberInputComponent from "../../components/input/NumberInputComponent";
import AircraftOptions from "../../components/aircraft/AircraftOptions";
import useAuth, { AuthActions } from "../../hooks/auth";

const GeneralInfo: React.FC<Props> = ({data, readOnly, instructor} : Props) => {
    const user: AuthActions = useAuth()

    return (
        <div className="gray-container">
                {/* general info page */}
                <h1 className="form-header">GENERAL INFO</h1>

                {data.user.userId != user.user.userId ? <TextInputComponent readOnly title='Pilot' value={data.user.firstName + ' ' + data.user.lastName}/> : ''}

                <div className="flex flex-col w-40">
                    <label htmlFor='date'>Date</label>
                    <input title='date' required name='date' type="date" readOnly={readOnly} defaultValue={data.date.slice(0,10)}/>
                </div>

                <AircraftOptions readOnly={readOnly || instructor} data={data}/>

                <TextInputComponent readOnly={readOnly} formName='from' title='From' value={data.from.toUpperCase()}/>
                <TextInputComponent readOnly={readOnly} formName='to' title='To' value={data.to.toUpperCase()}/>
                <TextInputComponent readOnly={readOnly} formName='route' title='Route' value={data.route}/>

                <div className="w-full my-1"/>

                <NumberInputComponent readOnly={readOnly} value={data.pic} title='PIC' formName='pic' fillValue={data.totalTime}/>
                <NumberInputComponent readOnly={readOnly} value={data.sic} title='SIC' formName='sic' fillValue={data.totalTime}/>
                <NumberInputComponent readOnly={readOnly} value={data.night} title='Night' formName='night' fillValue={data.totalTime}/>
                <NumberInputComponent readOnly={readOnly} value={data.solo} title='Solo' formName='solo' fillValue={data.totalTime}/>
                <NumberInputComponent readOnly={readOnly} value={data.crossCountry} title='Cross Country' formName='crossCountry' fillValue={data.totalTime}/>
                <NumberInputComponent readOnly={readOnly} value={data.dualRecieved} title='Dual Recieved' formName='dualRecieved' fillValue={data.totalTime}/>
                <NumberInputComponent readOnly={readOnly} value={data.dualGiven} title='Dual Given' formName='dualGiven' fillValue={data.totalTime}/>
                <NumberInputComponent readOnly={readOnly} value={data.dayLandings} int title='Day Landings' formName='dayLandings'  fillValue={data.totalLandings}/>
                <NumberInputComponent readOnly={readOnly} value={data.nightLandings} int title='Night Landings' formName='nightLandings' fillValue={data.totalLandings}/>
                <NumberInputComponent readOnly={readOnly} value={data.totalLandings} int title='Total Landings' formName='totalLandings' fillValue={data.dayLandings + data.nightLandings}/>

                <div className="w-full my-1"/>

                <NumberInputComponent readOnly={readOnly} value={data.totalTime} buttonHidden title='Total Time' formName='totalTime'/>
            </div>
    )
}

type Props = {
    data: LogbookEntry
    readOnly?: boolean
    instructor?: boolean
}

export default GeneralInfo