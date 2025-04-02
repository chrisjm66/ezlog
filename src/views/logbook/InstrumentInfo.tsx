import React from "react";
import { LogbookEntry } from "../../hooks/logbook";
import CheckboxComponent from "../../components/input/CheckboxInputComponent";
import NumberInputComponent from "../../components/input/NumberInputComponent";
import TextInputComponent from "../../components/input/TextInputComponent";

const InstrumentInfo: React.FC<Props> = ({data, readOnly} : Props) => {
    return (
        <div className="flex flex-wrap justify-left border-2 border-ezgray bg-gray-200 p-5 rounded-xl gap-x-5 gap-y-2 w-3/4 h-3/4">
            <h1 className="text-xl font-bold w-full mb-2">INSTRUMENT</h1>

            <NumberInputComponent readOnly={readOnly} value={data.simImc} title='Simulated IMC' buttonHidden formName='simImc'/>
            <NumberInputComponent readOnly={readOnly} value={data.actImc} title='Actual IMC' buttonHidden formName='actImc'/>
            <NumberInputComponent readOnly={readOnly} value={data.approaches} int buttonHidden title='Approaches' formName='approaches'/>
            <TextInputComponent readOnly={readOnly} value={data.approachNames} extended title='Approach Names' formName='approachNames'/>

            <div className="w-full my-1"/>

            <CheckboxComponent readOnly={readOnly} value={data.holding} title='Holding' formName='holding'/>
            <CheckboxComponent readOnly={readOnly} value={data.intercepting} title='Intercepting and Tracking Courses' formName='intercepting'/>
        </div>
    )
}

type Props = {
    data: LogbookEntry
    readOnly?: boolean
}

export default InstrumentInfo