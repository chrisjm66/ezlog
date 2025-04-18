export const getDaysFromNow = (days: number): Date => {
    const newDate = new Date()
    newDate.setDate(newDate.getDate() - days)

    return newDate
}

export const getCalendarMonthsFromNow = (months: number): Date => {
    const newDate = new Date()
    const currentDate = new Date()

    newDate.setDate(1)
    newDate.setMonth(currentDate.getMonth() - months)
    newDate.setHours(0)
    newDate.setMinutes(0)
    newDate.setSeconds(0)
    
    return newDate
}