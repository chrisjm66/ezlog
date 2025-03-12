import { createContext, useContext, ReactElement, useEffect, useState, useMemo} from "react"
import axios, { AxiosResponse } from "axios"
import { Outlet } from "react-router-dom"

const LogbookContext = createContext<LogbookActions>({} as LogbookActions)
const useLogbook = (): LogbookActions => useContext<LogbookActions>(LogbookContext)


const useLogbookActions = (): LogbookActions  => {
  const [logbookData, setLogbookData] = useState<LogbookEntry[] | undefined>([] as LogbookEntry[])

  const populateLogbookEntries = (): void => {
    axios.get<LogbookEntry[]>('/api/logbook').then((fetchData: AxiosResponse<LogbookEntry[] | undefined>) => {
      setLogbookData(fetchData.data)
      console.log(logbookData)
    }).catch((err) => {
      console.error(err)
    })

  }

  const submitEntry = async(data: LogbookEntry): Promise<number> => {
    const response: AxiosResponse = await axios.post('/api/logbook', data)

    return response.status
  }

  return {populateLogbookEntries, submitEntry, logbookData}
}

export const ProvideLogbook = (): ReactElement => {
    const logbook: LogbookActions = useLogbookActions()

    useEffect(() => {
      logbook.populateLogbookEntries()
    }, [])

    return (
        <LogbookContext.Provider value={logbook}>
            <Outlet/>
        </LogbookContext.Provider>
    )
}

export type LogbookEntry = {
  entryId: number | undefined
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
  instructorSignature?: Blob
  instructorId?: number
}

export type Aircraft = {
  tailNumber: string
  type: string
  make: string
  model: string
  engineType: string
  numberOfEngines: number
}

export interface LogbookActions {
  populateLogbookEntries: () => void
  submitEntry: (data: LogbookEntry) => Promise<number>
  logbookData: LogbookEntry[] | undefined
}
export default useLogbook