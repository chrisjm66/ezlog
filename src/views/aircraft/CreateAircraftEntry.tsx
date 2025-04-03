import { ReactElement, useState } from "react"
import Modal from "../../components/modal/Modal"
import NumberInputComponent from "../../components/input/NumberInputComponent"
import CheckboxComponent from "../../components/input/CheckboxInputComponent"
import TextInputComponent from "../../components/input/TextInputComponent"
import { useNavigate } from "react-router-dom"
import useAircraft, { Aircraft, AircraftActions } from "../../hooks/aircraft"

const INPUT_CLASSNAME = 'px-2 py-1 w-full bg-white rounded-sm border-1 font-bold text-xl text-ezblue'
const LABEL_CLASSNAME = 'text-xl mb-2'
const INITIAL_STATE: Aircraft = {
    aircraftId: -1,
    tailNumber: '',
    description: '',
    make: '',
    typeCode: '',
    model: '',
    numberOfEngines: 0,
    engineType: '',
    taa: false,
    complex: false,
    highPerformance: false
}

const CreateAircraftEntry = (): ReactElement => {
    
}


export default CreateAircraftEntry