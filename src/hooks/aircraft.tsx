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
        return 501 // not implemented
    }

    const deleteAircraft = async(data: Aircraft): Promise<number> => {
        return 501 // not implemented
    }

    const updateAircraft = async(data: Aircraft): Promise<number> => {
        return 501 // not implemented
    }

    return {aircraftData, addAircraft, deleteAircraft, updateAircraft, populateAircraftEntries}
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
    deleteAircraft: (data: Aircraft) => Promise<number>
    updateAircraft: (data: Aircraft) => Promise<number>
}

export type Aircraft = {
    aircraft_id: number;
    tail_number: string;
    description: string | null;
    make: string | null;
    type_code: string;
    model: string | null;
    engine_type: string;
    taa: boolean;
    complex: boolean;
    high_performance: boolean;
}

export default useAircraft