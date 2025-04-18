import { LogbookEntry } from "../hooks/logbook";
import { getCalendarMonthsFromNow, getDaysFromNow } from "./time";

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

    const checkCalendarDate: Date = getCalendarMonthsFromNow(24)
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

    const checkCalendarDate: Date = getDaysFromNow(90)
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
            currentFor: 0,
            checkrideInLast24: false,
            flightReviewInLast24: false
        }
    }

    const checkCalendarDate: Date = getCalendarMonthsFromNow(24)
    let flightReview = false
    let checkride = false

    entries.map((data) => {
        const date = new Date(data.date)
        

        if (date.getTime() > checkCalendarDate.getTime()) {
            flightReview = data.flightReview || flightReview
            checkride = data.checkride || checkride
        }
    })

    return {
        current: flightReview,
        currentFor: 0,
        checkrideInLast24: checkride,
        flightReviewInLast24: flightReview
    }
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
    checkrideInLast24: boolean
    flightReviewInLast24: boolean
}