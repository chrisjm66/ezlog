import { createContext, useContext, ReactElement, useEffect, useState} from "react"
import axios, { AxiosResponse } from "axios"
import { UserModel } from "./auth"
import { Aircraft } from "./aircraft"

const LogbookContext = createContext<LogbookActions>({} as LogbookActions)
const useLogbook = (): LogbookActions => useContext<LogbookActions>(LogbookContext)


const useLogbookActions = (): LogbookActions  => {
  const [logbookData, setLogbookData] = useState<LogbookEntry[] | undefined>([] as LogbookEntry[])

  const getLogbookEntry = (entryId: number): LogbookEntry | undefined => {
    let returnEntry: LogbookEntry | undefined = undefined

    logbookData?.map((entry: LogbookEntry) => {
      if (entry.entryId == entryId) {
        returnEntry = entry
        return
      }
    })

    return returnEntry
  }

  const populateLogbookEntries = (): void => {
    axios.get('/api/logbook').then((fetchData: AxiosResponse) => {
      setLogbookData(fetchData.data?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
      console.log(logbookData)
    }).catch((err) => {
      console.error(err)
    })
  }

  const submitEntry = async(data: LogbookEntry): Promise<number> => {
    const response: AxiosResponse = await axios.post('/api/logbook', data)

    return response.status
  }

  const updateEntry = async(data: LogbookEntry): Promise<number> => {
    const response: AxiosResponse = await axios.put('/api/logbook', data)

    return response.status
  }

  return {populateLogbookEntries, getLogbookEntry, submitEntry, updateEntry, logbookData}
}

export const ProvideLogbook = ({children}): ReactElement => {
    const logbook: LogbookActions = useLogbookActions()

    useEffect(() => {
      logbook.populateLogbookEntries()
    }, [])

    return (
        <LogbookContext.Provider value={logbook}>
            {children}
        </LogbookContext.Provider>
    )
}

export type LogbookEntry = {
  user: UserModel
  aircraft: Aircraft | undefined
  instructor: UserModel | undefined
  entryId: number | undefined
  aircraftId?: number
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
  instructorSignature?: {lines: string[], width: number, height: number}
  instructorExpiryDate?: string
  instructorSignedDate?: string
  instructorCid?: string

}

export interface LogbookActions {
  logbookData: LogbookEntry[] | undefined
  populateLogbookEntries: () => void
  getLogbookEntry: (entryId: number) => LogbookEntry | undefined
  submitEntry: (data: LogbookEntry) => Promise<number>
  updateEntry: (data: LogbookEntry) => Promise<number>  
}
export default useLogbook