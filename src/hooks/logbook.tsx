import { createContext, useContext, ReactElement, useEffect, useState} from "react"
import axios, { AxiosResponse } from "axios"
import useAuth, { AuthActions, UserModel } from "./auth"
import { Aircraft } from "./aircraft"
import { toast } from "react-toastify"

const LogbookContext = createContext<LogbookActions>({} as LogbookActions)
const useLogbook = (): LogbookActions => useContext<LogbookActions>(LogbookContext)


const useLogbookActions = (): LogbookActions  => {
  const [logbookData, setLogbookData] = useState<LogbookEntry[] | undefined>([] as LogbookEntry[])
  const auth: AuthActions = useAuth()

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

  const submitEntry = async(data: LogbookEntry): Promise<void> => {
    axios.post('/api/logbook', data).then((res) => {
      if (res.status == 200) {
        toast.success('Entry submitted!')
        populateLogbookEntries()
      }
    }).catch((err) => {
      toast.error(`Error ${err.status} - ${err.response.statusText}`)
    })
  }

  const deleteEntry = async(data: LogbookEntry): Promise<void> => {
    await axios.delete('/api/logbook', {
      data: {
        entryId: data.entryId
      }
    }).then((res) => {
      if (res.status == 200) {
        toast.success('Entry deleted!')
        populateLogbookEntries()
      }
    }).catch((err) => {
      toast.error(`Error ${err.status} - ${err.response.statusText}`)
    })
  }

  const updateEntry = async(data: LogbookEntry): Promise<void> => {
    axios.put('/api/logbook', data).then((res) => {
      if (res.status == 200) {
        toast.success('Entry Updated!')
        populateLogbookEntries()
      }
    }).catch((err) => {
      toast.error(`Error ${err.status} - ${err.response.statusText}`)
    })
  }

  const getDefaultLogbookEntry = (): LogbookEntry => {
    return  {
      date: new Date().toISOString(),
      entryId: undefined,
      aircraftId: undefined,
      totalTime: 0,
      pic: 0,
      sic: 0,
      solo: 0,
      crossCountry: 0,
      simImc: 0,
      actImc: 0,
      night: 0,
      dayLandings: 0,
      nightLandings: 0,
      totalLandings: 0,
      holding: false,
      approaches: 0,
      dualGiven: 0,
      dualRecieved: 0,
      route: '',
      to: "",
      from: "",
      remarks: "",
      approachNames: "",
      intercepting: false,
      ipc: false,
      checkride: false,
      flightReview: false,
      user: auth.user,
      instructor: undefined,
      aircraft: undefined
    }
  }

  const requestRemoveInstructorSignature = (entryId: number | undefined) => {
    if (!entryId) {
      toast.error('No logbook entry ID available.')
      return
    }

    axios.delete('/api/instructor/request', {
        data: {
            entryId: entryId
        }
    }).then((response) => {
        if (response.status == 200) {
            toast.success('Instructor signature removed!')
            populateLogbookEntries()
        }
    }).catch((error) => {
        console.error(error)

        if (error.status == 400) {
            toast.error('Error 400 - Instructor not found')
        } else {
            toast.error(`Error ${error.status} - ` + error.response.statusText)
        }
    })
  }

  const requestSignature = (entryId: number, instructorEmail: string) => {
    axios.put('/api/instructor/request', {
        entryId: entryId,
        instructorEmail: instructorEmail
    }).then((response) => {
        if (response.status == 200) {
            toast.success('Instructor signature requested!')
            populateLogbookEntries()
        }
    }).catch((error) => {
        console.error(error)

        if (error.status == 400) {
            toast.error('Error 400 - ' + error.response.statusText)
        } else {
            toast.error(`Error ${error.status} - ` + error.response.statusText)
        }
    })
  }
  
  return {populateLogbookEntries, getLogbookEntry, submitEntry, updateEntry, deleteEntry, logbookData, getDefaultLogbookEntry, requestSignature, requestRemoveInstructorSignature}
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
  submitEntry: (data: LogbookEntry) => Promise<void>
  updateEntry: (data: LogbookEntry) => Promise<void>  
  deleteEntry: (data: LogbookEntry) => Promise<void>
  getDefaultLogbookEntry: () => LogbookEntry
  requestSignature: (entryId: number, instructorEmail: string) => void
  requestRemoveInstructorSignature: (entryId: number | undefined) => void
}
export default useLogbook