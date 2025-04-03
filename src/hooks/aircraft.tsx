import { createContext, ReactElement, useContext, useEffect, useState } from "react"
import axios, { AxiosResponse } from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const AircraftContext = createContext({})
const useAircraft = (): any => useContext(AircraftContext)

// logic for the context provider
const useAircraftActions = (): AircraftActions => {
    const [aircraftData, setAircraftData] = useState<Aircraft[] | undefined>([] as Aircraft[])
    const navigate = useNavigate()

    const getDefaultAircraftEntry = (): Aircraft => {
        return {
            aircraftId: -1,
            tailNumber: '',
            description: '',
            make: '',
            typeCode: '',
            model: '',
            numberOfEngines: 0,
            engineType: 'P',
            taa: false,
            complex: false,
            highPerformance: false
        }
    }

    const populateAircraftEntries = (): void => {
        axios.get<Aircraft[]>('/api/aircraft').then((fetchData: AxiosResponse<Aircraft[] | undefined>) => {
          setAircraftData(fetchData.data)
          console.log(aircraftData)
        }).catch((err) => {
          console.error(err)
        })
    }

    const addAircraft = async(data: Aircraft): Promise<void> => {
        axios.post('/api/aircraft', data).then((response) => {
            if (response.status == 200) {
                toast.success('Aircraft added!')
                populateAircraftEntries()
            }
        }).catch((error) => {
            toast.error(`Error ${error.status} - ` + error.response.statusText)
        })
    }

    const deleteAircraft = async(aircraftId: number): Promise<void> => {
        axios.delete('/api/aircraft', {
            data: {
                aircraftId: aircraftId
            }
        }).then((response) => {
            if (response.status == 200) {
                toast.success('Aircraft deleted!')
                populateAircraftEntries()
                navigate('/dashboard/aircraft')
            }
        }).catch((error) => {
            toast.error(`Error ${error.status} - ` + error.response.statusText)
        })
    }

    const getAircraft = (aircraftId: number | undefined): Aircraft | undefined => {
        if (aircraftId == undefined) return undefined
        let returnEntry: Aircraft | undefined = undefined

        aircraftData?.map((aircraft: Aircraft) => {
        if (aircraft.aircraftId == aircraftId) {
            returnEntry = aircraft
            return
        }
        })

        return returnEntry
    }

    const updateAircraft = async(data: Aircraft): Promise<void> => {
        axios.put('/api/aircraft', data).then((response) => {
            if (response.status == 200) {
                toast.success('Aircraft updated!')
                populateAircraftEntries()
            }
        }).catch((error) => {
            toast.error(`Error ${error.status} - ` + error.response.statusText)
        })
    }

    return {aircraftData, getDefaultAircraftEntry, addAircraft, deleteAircraft, getAircraft, updateAircraft, populateAircraftEntries}
}

// creates a wrapper for the rest of the app
export const ProvideAircraft = ({children}): ReactElement => {
    const aircraft: AircraftActions = useAircraftActions()

    useEffect(() => {
        aircraft.populateAircraftEntries()
    }, [])
    
    return (
        <AircraftContext.Provider value={aircraft}>
            {children}
        </AircraftContext.Provider>
    )
}

export interface AircraftActions {
    aircraftData: Aircraft[] | undefined
    getDefaultAircraftEntry: () => Aircraft
    populateAircraftEntries: () => void
    addAircraft: (data: Aircraft) => Promise<void>
    deleteAircraft: (aircraftId: number) => Promise<void>
    getAircraft: (aircraftId: number | undefined) => Aircraft | undefined
    updateAircraft: (data: Aircraft) => Promise<void>
}

export type Aircraft = {
    aircraftId: number;
    tailNumber: string;
    description?: string;
    numberOfEngines: number;
    make?: string;
    typeCode: string;
    model?: string;
    engineType: string;
    taa: boolean;
    complex: boolean;
    highPerformance: boolean;
}

export default useAircraft