import prisma from "../middlewares/db"
import { Aircraft } from "@prisma/client"

export const getAircraftList = async(userId: number): Promise<Aircraft[]> => {
    const query: Aircraft[] = await prisma.aircraft.findMany({
        where: {
            user_id: userId
        }
    })

    return query
}