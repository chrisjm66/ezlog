import { FC, ReactElement, useRef } from "react"
import useLogbook, { LogbookEntry } from "../../hooks/logbook"
import Modal from "../modal/Modal"
import useAuth, { AuthActions } from "../../hooks/auth"
import CanvasDraw from 'react-canvas-draw'
import axios, { AxiosResponse } from "axios"
import { toast } from "react-toastify"

const SignLogbook: FC<Props> = ({data, opened, onClose}: Props): ReactElement => {
    const {user}: AuthActions = useAuth()
    const canvas = useRef<React.JSX.Element | null>(null)
    const logbook = useLogbook()

    const sendSignRequest = async() => {
        if (!data) {
            return toast.error('Invalid logbook data provided.')
        }

        //@ts-expect-error no type data
        const canvasData: string = canvas.current?.getSaveData()
        data.instructorCid = user.instructorCid
        data.instructorExpiryDate = user.instructorExpiryDate

        const response: AxiosResponse = await axios.post('/api/instructor/sign', {
            entry: data,
            canvasData: canvasData
        })
        console.log(response.status)
        if (response.status == 200) {
            toast.success('Entry signed!')
        } else if (response.status == 401) {
            toast.error('Unauthorized')
        } else {
            toast.error('Error ' + response.status + ' ' + response.statusText)
        }

        onClose()
        logbook.populateLogbookEntries()
    }

    if (!data) {
        return <h2>No data available</h2>
    }

    return (
        <Modal open={opened} title='Sign Logbook' onClose={onClose}>
            
            <div className='p-2 relative'>
                <div className='my-2 relative'>
                    <CanvasDraw ref={canvas} brushRadius={5} hideGrid={true} canvasWidth={400} canvasHeight={150}/>
                    <h4 className='italic tracking-tighter absolute right-1 bottom-1 select-none'>{user.firstName.toUpperCase()} {user.lastName.toUpperCase()} - {user.instructorCid?.toUpperCase()} EXP {user.instructorExpiryDate?.toUpperCase()}</h4>
                </div>

                {/* @ts-expect-error no types available */}
                <button className='bg-ezred' onClick={() => canvas.current?.clear()}>Clear</button>
                <button className='bg-ezgreen ml-5' onClick={sendSignRequest}>Sign</button>
            </div>
            
            
        </Modal>
    )
}

type Props = {
    data?: LogbookEntry
    opened: boolean
    onClose: () => void
}

export default SignLogbook
