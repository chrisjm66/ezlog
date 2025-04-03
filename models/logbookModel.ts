import prisma from '../middlewares/db'
import {UserModel} from './authModel'
import { LogbookEntry as ClientLogbookEntry } from '../src/hooks/logbook'
import { LogbookEntry, Prisma } from '@prisma/client'
import { toClientAircraft, userOwnsAircraft } from './aircraftModel'
import { toClientUserModel } from './authModel'

export const addEntryToDatabase = async(user: UserModel, body: ClientLogbookEntry): Promise<LogbookEntry | null> => {
    try {
        if (!await userOwnsAircraft) {
            return null
        }

        console.log(body)
        const insert: LogbookEntry = await prisma.logbookEntry.create({
            data: {
                date: new Date(body.date),
                user_id: user.userId,
                aircraft_id: body.aircraftId,
                total_time: body.totalTime,
                pic: body.pic,
                sic: body.sic,
                solo: body.solo,
                cross_country: body.crossCountry,
                sim_imc: body.simImc,
                actual_imc: body.actImc,
                night: body.night,
                day_landings: body.dayLandings,
                night_landings: body.nightLandings,
                total_landings: body.totalLandings,
                holding: body.holding,
                intercepting: body.intercepting,
                approaches: body.approaches,
                approach_names: body.approachNames,
                dual_given: body.dualGiven,
                dual_recieved: body.dualRecieved,
                to: body.to,
                from: body.from,
                route: body.route,
                ipc: body.ipc, // convert boolean to tinyint
                checkride: body.checkride,
                flight_review: body.flightReview,
                remarks: body.remarks
    
                /*
                pic                  Decimal  @default(0.00) @db.Decimal(4, 2)
                sic                  Decimal  @default(0.00) @db.Decimal(4, 2)
                cross_country        Decimal  @default(0.00) @db.Decimal(4, 2) @map("crossCountry")
                sim_imc              Decimal  @default(0.00) @db.Decimal(4, 2) @map("simImc")
                actual_imc           Decimal  @default(0.00) @db.Decimal(4, 2) @map("actualImc")
                night                Decimal  @default(0.00) @db.Decimal(4, 2)
                day_landings         Int      @default(0) @db.UnsignedInt @map("dayLandings")
                total_landings       Int?     @default(0) @db.UnsignedInt @map("totalLandings")
                night_landings       Int      @default(0) @db.UnsignedInt @map("nightLandings")
                holding              Int      @default(0) @db.TinyInt
                approaches           Int      @default(0) @db.UnsignedInt
                dual_given           Decimal  @default(0.00) @db.Decimal(4, 2) @map("dualRecieved")
                dual_recieved        Decimal  @default(0.00) @db.Decimal(4, 2) @map("dualGiven")
                route                String   @db.VarChar(300)
                ipc                  Int      @default(0) @db.TinyInt
                checkride            Int      @default(0) @db.TinyInt
                flight_review        Int      @default(0) @db.TinyInt @map("flightReview")
                user_id              Int      @db.UnsignedInt @map("userId")
                instructor_signature Bytes?   @db.Blob @map("instructorSignature")
                instructor_id        Int?     @db.UnsignedInt @map("instructorId")
                date                 DateTime @db.Date @map("date")
                */
            }
        })
        return insert
    } catch(e) {
        console.error(e)
    }
    return null
}

export const deleteEntryFromDatabase = async(user: UserModel, entryId: number): Promise<boolean | null> => {
    try {
        if (!await userOwnsAircraft) {
            return null
        }

        const data: LogbookEntry | null = await prisma.logbookEntry.findFirst({
            where: {
                user_id: user.userId, // so some prankster doesnt delete other peoples queries
                logbook_entry_id: entryId
            }
        })
        
        if (!data) {
            return null
        }

        await prisma.logbookEntry.delete({
            where: {
                logbook_entry_id: entryId
            }
        })

        return true
    } catch(e) {
        console.error(e)
    }
    return null
}

export const updateLogbookEntry = async(user: UserModel, body: ClientLogbookEntry): Promise<LogbookEntry | null> => {
    if (!await userOwnsAircraft) {
        return null
    }
    
    try {
        const entry = await prisma.logbookEntry.update({
            data: {
                date: new Date(body.date),
                aircraft_id: 1,
                total_time: body.totalTime,
                pic: body.pic,
                sic: body.sic,
                solo: body.solo,
                cross_country: body.crossCountry,
                sim_imc: body.simImc,
                actual_imc: body.actImc,
                night: body.night,
                day_landings: body.dayLandings,
                night_landings: body.nightLandings,
                total_landings: body.totalLandings,
                holding: body.holding,
                intercepting: body.intercepting,
                approaches: body.approaches,
                approach_names: body.approachNames,
                dual_given: body.dualGiven,
                dual_recieved: body.dualRecieved,
                to: body.to,
                from: body.from,
                route: body.route,
                ipc: body.ipc, // convert boolean to tinyint
                checkride: body.checkride,
                flight_review: body.flightReview,
                remarks: body.remarks
            },
            where: {
                user_id: user.userId,
                logbook_entry_id: body.entryId,
                instructor_signature: undefined // force locks entries that are signed
            }
        })

        return entry
    } catch {
        console.error('Error updating logbook entry')
        return null
    }
}

export const getLogbookEntries = async(user: UserModel): Promise<ClientLogbookEntry[]> => {
    // get user data
    const query = await prisma.logbookEntry.findMany({
        select: {
            logbook_entry_id: true,
            aircraft: true,
            user: true,
            instructor: true,
            instructor_signature: true,
            instructor_cid: true,
            instructor_signed_date: true,
            instructor_expiry_date: true,
            user_id: true,
            date: true,
            aircraft_id: true,
            total_time: true,
            pic: true,
            sic: true,
            solo: true,
            cross_country: true,
            sim_imc: true,
            actual_imc: true,
            night: true,
            day_landings: true,
            night_landings: true,
            total_landings: true,
            holding: true,
            intercepting: true,
            approaches: true,
            approach_names: true,
            dual_given: true,
            dual_recieved: true,
            to: true,
            from: true,
            route: true,
            ipc: true,
            checkride: true,
            flight_review: true,
            remarks: true
        },
        where: {
            OR: [
                { user_id: user.userId },
                { instructor_user_id: user.userId }
            ]
        }
    })
    
    // set into client version
    const userEntry: ClientLogbookEntry[] = [] as ClientLogbookEntry[]

    for (let i = 0; i < query.length; i++) {
        userEntry.push({
            //@ts-expect-error user is known to exist
            user: toClientUserModel(query[i].user),
            entryId: query[i].logbook_entry_id,
            aircraft: toClientAircraft(query[i].aircraft || undefined) || undefined,
            aircraftId: query[i].aircraft_id || -1,
            date: query[i].date.toISOString(),
            totalTime: Prisma.Decimal(query[i].total_time).toNumber(),
            pic: Prisma.Decimal(query[i].pic).toNumber(),
            sic: Prisma.Decimal(query[i].sic).toNumber(),
            crossCountry: Prisma.Decimal(query[i].cross_country).toNumber(),
            simImc: Prisma.Decimal(query[i].sim_imc).toNumber(),
            actImc: Prisma.Decimal(query[i].actual_imc).toNumber(),
            night: Prisma.Decimal(query[i].night).toNumber(),
            solo: Prisma.Decimal(query[i].solo).toNumber(),
            dayLandings: query[i].day_landings,
            nightLandings: query[i].night_landings,
            totalLandings: query[i].total_landings,
            holding: query[i].holding,
            approaches: query[i].approaches,
            approachNames: query[i].approach_names,
            intercepting: query[i].intercepting,
            dualGiven: Prisma.Decimal(query[i].total_time).toNumber(),
            dualRecieved: Prisma.Decimal(query[i].total_time).toNumber(),
            route: query[i].route,
            ipc: query[i].ipc,
            checkride: query[i].checkride,
            flightReview: query[i].flight_review,
            to: query[i].to,
            from: query[i].from,
            remarks: query[i].remarks,
            instructorCid: query[i].instructor_cid || undefined,
            // @ts-expect-error i have no idea but it works trust
            instructorSignature: query[i].instructor_signature || undefined,
            instructorSignedDate: query[i].instructor_signed_date?.toISOString() || undefined,
            instructorExpiryDate: query[i].instructor_expiry_date || undefined,
            instructor: toClientUserModel(query[i].instructor || undefined) || undefined
        })
    }

    return userEntry
}

export const submitSignature = async(entry: ClientLogbookEntry, canvasData: JSON) => {
    await prisma.logbookEntry.update({
        data: {
            instructor_signature: canvasData.toString(),
            instructor_cid: entry.instructorCid,
            instructor_signed_date: new Date(),
            instructor_expiry_date: entry.instructorExpiryDate
        },
        where: {
            logbook_entry_id: entry.entryId,
            instructor_user_id: entry.instructor?.userId
        }
    })
}

export const addInstructorRequest = async(entryId: number, user: UserModel, instructorId: number): Promise<boolean> => {
    const query = await prisma.logbookEntry.update({
        data: {
            instructor_user_id: instructorId,
            instructor_signature: Prisma.DbNull,
            instructor_cid: null,
            instructor_signed_date: null,
            instructor_expiry_date: null
        }, where: {
            logbook_entry_id: entryId,
            user_id: user.userId // so some prankster doesnt delete other peoples queries
        }
    })

    return query ? true : false
}

export const clearInstructorAndSignature = async(entryId: number, user: UserModel): Promise<boolean> => {
    if (!entryId) {
        return false
    }

    const query = await prisma.logbookEntry.update({
        data: {
            instructor_user_id: null,
            instructor_signature: Prisma.DbNull,
            instructor_cid: null,
            instructor_signed_date: null,
            instructor_expiry_date: null
        }, where: {
            logbook_entry_id: entryId,
            user_id: user.userId // so some prankster doesnt delete other peoples queries
        }
    })

    return query ? true : false
}