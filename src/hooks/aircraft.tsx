import { createContext, ReactElement, useContext, useEffect, useState } from "react"
import axios, { AxiosResponse } from "axios"

const AircraftContext = createContext({})
const useAircraft = (): any => useContext(AircraftContext)

// logic for the context provider
const useAircraftActions = (): AircraftActions => {
    const [aircraftData, setAircraftData] = useState<Aircraft[] | undefined>([] as Aircraft[])
    
    const populateAircraftEntries = (): void => {
        axios.get<Aircraft[]>('/api/aircraft').then((fetchData: AxiosResponse<Aircraft[] | undefined>) => {
          setAircraftData(fetchData.data)
          console.log(aircraftData)
        }).catch((err) => {
          console.error(err)
        })
    }

    const addAircraft = async(data: Aircraft): Promise<number> => {
        const response = await axios.post('/api/aircraft', data)

        return response.status
    }

    const deleteAircraft = async(aircraftId: number): Promise<number> => {
        const response = await axios.delete('/api/aircraft', {data: aircraftId})

        return response.status
    }

    const getAircraft = (aircraftId: number): Aircraft | undefined => {
        let returnEntry: Aircraft | undefined = undefined

        aircraftData?.map((aircraft: Aircraft) => {
        if (aircraft.aircraftId == aircraftId) {
            returnEntry = aircraft
            return
        }
        })

        return returnEntry
    }

    const updateAircraft = async(data: Aircraft): Promise<number> => {
        const response = await axios.put('/api/aircraft', data)

        return response.status
    }

    return {aircraftData, addAircraft, deleteAircraft, getAircraft, updateAircraft, populateAircraftEntries}
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
    populateAircraftEntries: () => void
    addAircraft: (data: Aircraft) => Promise<number>
    deleteAircraft: (aircraftId: number) => Promise<number>
    getAircraft: (aircraftId: number) => Aircraft | undefined
    updateAircraft: (data: Aircraft) => Promise<number>
}

export type Aircraft = {
    aircraftId: number;
    tailNumber: string;
    description: string | null;
    numberOfEngines: number;
    make: string | null;
    typeCode: string;
    model: string | null;
    engineType: string;
    taa: boolean;
    complex: boolean;
    highPerformance: boolean;
}

export default useAircraft