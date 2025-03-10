import express, {type Request, type Response, type NextFunction} from 'express'
import { populateUserInfo } from '../middlewares/auth'
import prisma from '../middlewares/db'
import { UserModel } from '../models/authModel'
import { LogbookEntry, Prisma } from '@prisma/client'
import { LogbookEntry as ClientLogbookEntry } from '../src/hooks/logbook'
const router = express.Router()

router.use(populateUserInfo)

// get logbook data
router.get('/', async(req: Request, res: Response) => {
    const user: UserModel = res.locals.user

    if (!user) {
        return res.status(401).send()
    }

    // get user data
    const query: LogbookEntry[] = await prisma.logbookEntry.findMany({
        where: {
            user_id: user.userId
        }
    })
    
    // set into client version
    const userEntry: ClientLogbookEntry[] = {} as ClientLogbookEntry[]

    for (let i = 0; i < query.length; i++) {
        userEntry.push({
            aircraftId: query[i].aircraft_id,
            date: query[i].date.toISOString(),
            totalTime: Prisma.Decimal(query[i].total_time).toNumber(),
            pic: Prisma.Decimal(query[i].total_time).toNumber(),
            sic: Prisma.Decimal(query[i].total_time).toNumber(),
            crossCountry: Prisma.Decimal(query[i].total_time).toNumber(),
            simImc: Prisma.Decimal(query[i].total_time).toNumber(),
            actImc: Prisma.Decimal(query[i].total_time).toNumber(),
            night: Prisma.Decimal(query[i].total_time).toNumber(),
            solo: Prisma.Decimal(query[i].total_time).toNumber(),
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
        })
    }
    res.json(userEntry)
})

router.post('/', async(req: Request, res: Response): Promise<any> => {
    const body: ClientLogbookEntry = req.body
    const user: UserModel = res.locals.user

    if (!user) {
        return res.status(401).send()
    }

    try {
        await prisma.logbookEntry.create({
            data: {
                date: new Date(body.date),
                user_id: user.userId,
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
                holding: body.holding,
                intercepting: body.intercepting,
                approaches: body.approaches,
                dual_given: body.dualGiven,
                dual_recieved: body.dualRecieved,
                to: body.to,
                from: body.from,
                route: body.route,
                ipc: body.ipc, // convert boolean to tinyint
                checkride: body.checkride,
                flight_review: body.flightReview
    
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
    } catch(e) {
        console.error(e)
        return res.sendStatus(500)
    }
    
        
    res.sendStatus(200)
})

export default router