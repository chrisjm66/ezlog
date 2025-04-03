import prisma from "../middlewares/db"
import { Aircraft } from "@prisma/client"
import { Aircraft as ClientAircraft } from "../src/hooks/aircraft"

export const userOwnsAircraft = async(userId: number, aircraftId: number): Promise<boolean> => {
    const query: Aircraft | null = await prisma.aircraft.findFirst({
        where: {
            aircraft_id: aircraftId,
            user_id: userId
        }
    })

    if (query) {
        return true
    } else {
        return false
    }
}

export const getAircraftList = async(userId: number): Promise<Aircraft[] | null> => {
    if (!userId) {
        return null
    }

    const query: Aircraft[] = await prisma.aircraft.findMany({
        where: {
            user_id: userId
        }
    })

    return query
}

export const addAircraft = async(data: ClientAircraft, userId: number): Promise<Aircraft> => {
    const insert: Aircraft = await prisma.aircraft.create({
        data: {
            tail_number: data.tailNumber,
            description: data.description,
            make: data.make,
            type_code: data.typeCode,
            model: data.model,
            engine_type: data.engineType,
            number_of_engines: data.numberOfEngines,
            taa: data.taa,
            complex: data.complex,
            high_performance: data.highPerformance,
            user_id: userId
        }
    })

    return insert
}

export const updateAircraft = async(data: ClientAircraft, userId: number): Promise<Aircraft | undefined> => {
    try {
        const update: Aircraft = await prisma.aircraft.update({
            data: {
                tail_number: data.tailNumber,
                description: data.description,
                make: data.make,
                type_code: data.typeCode,
                model: data.model,
                engine_type: data.engineType,
                number_of_engines: data.numberOfEngines,
                taa: data.taa,
                complex: data.complex,
                high_performance: data.highPerformance,
            },
            where: {
                aircraft_id: data.aircraftId,
                user_id: userId
            }
        })

        return update
    } catch (error) {
        console.error(error)
        throw new Error('Error updating aircraft')
    }

    return undefined
}

export const deleteAircraft = async(aircraftId: number, userId: number): Promise<number | null> => {
    console.log(aircraftId, userId)
    if (!aircraftId || !userId) {
        return 400
    }

    await prisma.aircraft.delete({
        where: {
            aircraft_id: aircraftId,
            user_id: userId
        }
    })

    return 200
}

export const toClientAircraft = (aircraft: Aircraft | undefined): ClientAircraft | undefined => {
    if (! aircraft) {
        return undefined
    }
    const clientAircraft: ClientAircraft = {
        tailNumber: aircraft.tail_number,
        description: aircraft.description || undefined,
        make: aircraft.make || undefined,
        typeCode: aircraft.type_code,
        model: aircraft.model || undefined,
        engineType: aircraft.engine_type,
        numberOfEngines: aircraft.number_of_engines,
        taa: aircraft.taa || false,
        complex: aircraft.complex || false,
        highPerformance: aircraft.high_performance || false,
        aircraftId: aircraft.aircraft_id
    }

    return clientAircraft
}