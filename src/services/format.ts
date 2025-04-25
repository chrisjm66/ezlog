export const formatDate = (date: Date): string => {
    console.log(date)
    return `${(date.getUTCMonth() + 1).toString().padStart(2, "0")}/${date.getUTCDate().toString().padStart(2, "0")}/${date.getFullYear()}`
}