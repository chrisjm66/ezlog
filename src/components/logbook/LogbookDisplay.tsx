import { FC, ReactElement, useState } from "react"
import { LogbookEntry } from "../../hooks/logbook"
import Modal from "../modal/Modal"
import axios from "axios"
import { NavLink } from "react-router-dom"
import LogbookForm from "./LogbookForm"

const LogbookDisplay: FC<{data?: LogbookEntry}> = ({data}): ReactElement => {
    return (
        <div className='flex gap-y-5 flex-col overflow-y-scroll max-h-screen'>
            <LogbookForm data={data}/>
        </div>
    )
}

export default LogbookDisplay