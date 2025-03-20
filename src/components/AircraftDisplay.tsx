import { FC, ReactElement, useState } from "react"
import { Aircraft } from "../hooks/aircraft"
import CheckboxComponent from "./CheckboxInputComponent"
import DisplayComponent from "./DisplayComponent"
import Modal from "./Modal"
import axios from "axios"
import { NavLink } from "react-router-dom"

const INPUT_CLASSNAME = 'px-2 py-1 w-full bg-white rounded-sm border-1 font-bold text-xl text-ezblue'
const LABEL_CLASSNAME = 'text-xl mb-2'
const LogbookDisplay: FC<{data: Aircraft}> = ({data}): ReactElement => {
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [modalBody, setModalBody] = useState<string>('')

    const getEngineTypeString = (code: string): string => {
        let newString;
        switch(code) {
            case 'T':
                newString = 'Turboprop'
                break
            case 'P':
                newString = 'Piston'
                break
            case 'J':
                newString = 'Turbojet'
                break
            default:
                newString = 'Not Found'
                break
        }

        return newString
    }

    const requestDelete = () => {
        setModalVisible(true)
        setModalBody('Delete aircraf entry?')        
    }

    const sendDeleteRequest = async() => {
        const response = await axios.delete('/api/logbook', {data: {aircraftId: data.aircraftId}}) 
        if (response.status == 200) {
            window.location.reload()
        }
    }

    return (
        <div className='flex gap-y-5 flex-col overflow-y-scroll max-h-screen'>
            <Modal open={modalVisible} title='Confirm Action' onClose={() => setModalVisible(false)}>
                <h2>{modalBody}</h2>

                <button onClick={() => setModalVisible(false)} className='border-2 border-ezgray bg-ezgray text-white font-bold text-xl p-2 rounded-md transition-all hover:border-gray-800'>Cancel</button>
                <button onClick={sendDeleteRequest} className='border-2 border-ezgray bg-ezred text-white font-bold text-xl p-2 rounded-md transition-all hover:border-gray-800'>Confirm</button>
            </Modal>

            <div className="flex flex-wrap justify-left border-2 border-ezgray bg-gray-200 p-5 rounded-xl gap-x-5 gap-y-1 w-3/4 h-3/4">
                <DisplayComponent title='Tail Number' value={data.tailNumber}/>
                <DisplayComponent title='Type Code' value={data.typeCode}/>
                <DisplayComponent title='Make' value={data.make}/>
                <DisplayComponent title='Model' value={data.model}/>
                <DisplayComponent title='Engine Count' value={data.numberOfEngines}/>
                
                
                <DisplayComponent title='Aircraft Type' value={getEngineTypeString(data.engineType)} extended/>
                <DisplayComponent title='Description' value={data.description} extended/>

                <div className="w-full my-1"/>

                <CheckboxComponent title="TAA" value={data.taa} readOnly/>
                <CheckboxComponent title="Complex" value={data.complex} readOnly/>
                <CheckboxComponent title="High Performance" value={data.highPerformance} readOnly/>

                <div className="w-full my-1"/>

                <div className='flex flex-row gap-x-2'>
                    <NavLink to={`/dashboard/aircraft/edit/${data.aircraftId}`} className='border-2 border-ezgray bg-ezgray text-white font-bold text-xl p-2 rounded-md transition-all hover:border-gray-800'>Edit</NavLink>
                    <button onClick={requestDelete} className='border-2 border-ezgray bg-red-500 text-white font-bold text-xl p-2 rounded-md transition-all hover:border-gray-800'>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default LogbookDisplay