import { createContext, useContext, ReactElement } from "react"
import axios, { AxiosResponse } from "axios"

const LogbookContext = createContext({})
const useLogbook = (): any => useContext(LogbookContext)


const useLogbookActions = (): LogbookActions => {
  
  const getLogbookEntries = async(): Promise<LogbookEntry[]> => {
    const {data} = await axios.get<LogbookEntry[]>('/api/logbook')

    return data
  }

  const submitEntry = async(data: LogbookEntry): Promise<number> => {
    const response: AxiosResponse = await axios.post('/api/logbook', data)

    return response.status
  }

  return {getLogbookEntries, submitEntry}
}

export const ProvideLogbook = ({children}): ReactElement => {
    const logbook = useLogbookActions()

    /*useEffect(() => {
        // get the logbook info here?
    }, [])*/
    
    return (
        <LogbookContext.Provider value={logbook}>
            {children}
        </LogbookContext.Provider>
    )
}

export type LogbookEntry = {
  aircraftId: number
  date: string
  totalTime: number
  pic: number
  sic: number
  crossCountry: number
  simImc: number
  actImc: number
  night: number
  solo: number
  dayLandings: number
  nightLandings: number
  totalLandings: number
  holding: boolean
  approaches: number
  approachNames: string
  intercepting: boolean
  dualGiven: number
  dualRecieved: number
  route: string
  ipc: boolean
  checkride: boolean
  flightReview: boolean
  to: string
  from: string
  remarks: string
}

interface LogbookActions {
  getLogbookEntries: () => Promise<LogbookEntry[]>
  submitEntry: (data: LogbookEntry) => Promise<number>
}
export default useLogbook