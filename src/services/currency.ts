import { LogbookEntry } from "../hooks/logbook";

export const calculateIfrCurrency = (entries: LogbookEntry[] | undefined): IFRCurrencyData => {
    if (!entries) {
        return {
            current: false,
            approaches: 0,
            intercepting: false,
            holding: false,
            currentFor: 0
        }
    }

    const checkCalendarDate: Date = getSixCalendarMonthsFromNow(new Date())
    let approaches = 0
    let intercepting = false
    let holding = false
    
    entries.map((data) => {
        const date = new Date(data.date)
        

        if (date.getTime() > checkCalendarDate.getTime()) {
            approaches += data.approaches
            intercepting = data.intercepting || intercepting
            holding = data.holding || holding
        }
    })

    const current = approaches >= 6 && intercepting && holding
    //let currentFor = 0

    // wip - current for calculation
    /*if (current) {
        let localApproaches = 0
        let localIntercepting = false
        let localHolding = false

        for (let i = entries.length - 1; i >= 0; i--) {
            
        }
    }*/

    const currencyData: IFRCurrencyData = {
        current: current,
        approaches: approaches,
        intercepting: intercepting,
        holding: holding,
        currentFor: 0
    }

    return currencyData
}

export const calculateAselCurrency = (entries: LogbookEntry[] | undefined): ASELCurrencyData => {
    if (!entries) {
        return {
            dayLandings: 0,
            nightLandings: 0,
            dayCurrent: false,
            nightCurrent: false,
            dayCurrentFor: 0,
            nightCurrentFor: 0
        }
    }

    const checkCalendarDate: Date = getNinetyDaysFromNow(new Date())
    let dayLandings = 0
    let nightLandings = 0

    entries.map((data) => {
        const date = new Date(data.date)
        

        if (date.getTime() > checkCalendarDate.getTime()) {
            dayLandings += data.dayLandings
            nightLandings += data.nightLandings
        }
    })

    const dayCurrent = dayLandings >= 3
    const nightCurrent = nightLandings >= 3

    return {
        dayLandings: dayLandings,
        nightLandings: nightLandings,
        dayCurrent: dayCurrent,
        nightCurrent: nightCurrent,
        dayCurrentFor: 0,
        nightCurrentFor: 0
    }
}

export const calculateFlightReviewCurrency = (entries: LogbookEntry[] | undefined): FlightReviewCurrencyData => {
    if (!entries) {
        return {
            current: false,
            currentFor: 0
        }
    }

    const checkCalendarDate: Date = get24CalendarMonthsFromNow(new Date())
    let flightReview = false

    entries.map((data) => {
        const date = new Date(data.date)
        

        if (date.getTime() > checkCalendarDate.getTime()) {
            flightReview = data.flightReview || flightReview
        }
    })

    return {
        current: flightReview,
        currentFor: 0
    }
}

export const getRecentExperienceData = (entries: LogbookEntry[] | undefined): RecentExperienceData => {
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
            landings: '0D/0N',
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

   const checkCalendarDate = getNinetyDaysFromNow(new Date())

   entries.map((data) => {
        const date = new Date(data.date)

        if (date.getTime() > checkCalendarDate.getTime()) {
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
        landings: `${dayLandings}D/${nightLandings}N`,
        totalTime: totalTime
    }
}

const getNinetyDaysFromNow = (date: Date): Date => {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() - 90)

    return newDate
}

const getSixCalendarMonthsFromNow = (date: Date): Date => {
    const newDate = new Date(date)

    newDate.setDate(1)
    newDate.setMonth(date.getMonth() - 6)
    newDate.setHours(0)
    newDate.setMinutes(0)
    newDate.setSeconds(0)
    
    return newDate
}

const get24CalendarMonthsFromNow = (date: Date): Date => {
    const newDate = new Date(date)

    newDate.setDate(1)
    newDate.setMonth(date.getMonth() - 24)
    newDate.setHours(0)
    newDate.setMinutes(0)
    newDate.setSeconds(0)

    return newDate
}

export type IFRCurrencyData = {
    current: boolean
    approaches: number
    intercepting: boolean
    holding: boolean
    currentFor: number
}

export type ASELCurrencyData = {
    dayLandings: number,
    nightLandings: number,
    dayCurrent: boolean,
    nightCurrent: boolean,
    dayCurrentFor: number,
    nightCurrentFor: number
}

export type FlightReviewCurrencyData = {
    current: boolean
    currentFor: number
}

export type RecentExperienceData = {
    pic: number
    crossCountry: number
    instrument: number
    night: number
    landings: string
    totalTime: number
}