import { toast } from "react-toastify";
import { LogbookEntry } from "../hooks/logbook";

export const validateTimes = (data: LogbookEntry) => {
    // Verify PIC + SIC = TT
    if (data.totalTime != (data.pic + data.sic)) {
        toast.warn('PIC and SIC time do not add to total time.')
    }

    // D + N = total landings
    if (data.dayLandings + data.nightLandings != data.totalLandings) {
        toast.warn('Day and night landings do not sum to total landings.')
    }

    // Instructor requested should have dual recieved time
    if (data.instructor && !data.dualRecieved) {
        toast.warn('Instructor signature requested but no dual recieved time submitted')
    }

    if (data.approaches > 0 && data.approachNames == '') {
        toast.warn('Approaches logged but no approach names entered.')
    }
}