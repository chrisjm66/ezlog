import {getDaysFromNow} from './time'
import { LogbookEntry } from '../hooks/logbook'

export const getRecentExperienceData = (entries: LogbookEntry[] | undefined, days?: number): RecentExperienceData => {
    /*
     pic: number
    crossCountry: number
    instrument: number
    night: number
    landings: number
    totalTime: number
}
    */
   if (!entries) {
        return {
            pic: 0,
            crossCountry: 0,
            instrument: 0,
            night: 0,
            dayLandings: 0,
            nightLandings: 0,
            totalTime: 0
        }
   }

   let pic = 0
   let xc = 0
   let instrument = 0
   let night = 0
   let dayLandings = 0
   let nightLandings = 0
   let totalTime = 0

   const checkCalendarDate = days ? getDaysFromNow(days) : null

   entries.map((data) => {
        const date = new Date(data.date)

        if (!checkCalendarDate || (date.getTime() > checkCalendarDate.getTime())) {
            pic += data.pic
            xc += data.crossCountry
            instrument += data.actImc + data.simImc
            night += data.night
            dayLandings += data.dayLandings
            nightLandings += + data.nightLandings
            totalTime += data.totalTime
        }
   })

   return {
        pic: pic,
        crossCountry: xc,
        instrument: instrument,
        night: night,
        dayLandings: dayLandings,
        nightLandings: nightLandings,
        totalTime: totalTime
    }
}

export type RecentExperienceData = {
    pic: number
    crossCountry: number
    instrument: number
    night: number
    dayLandings: number
    nightLandings: number
    totalTime: number
}