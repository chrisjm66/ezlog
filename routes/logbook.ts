import express, {type Request, type Response, type NextFunction} from 'express'
import { populateUserInfo } from '../middlewares/auth'
import prisma from '../middlewares/db'
import { LogbookEntry } from '../src/hooks/logbook'
import { UserModel } from '../models/authModel'

const router = express.Router()

router.use(populateUserInfo)

// get logbook data
router.get('/', async(req: Request, res: Response) => {
    
})

router.post('/', async(req: Request, res: Response): Promise<any> => {
    const body: LogbookEntry = req.body
    const user: UserModel = res.locals.user

    if (!user) {
        return res.status(401).send()
    }

    try {
        await prisma.logbookEntry.create({
            data: {
                date: body.date,
                user_id: user.userId,
                aircraft_id: 1,
                total_time: body.totalTime,
                pic: body.pic,
                sic: body.sic,
                cross_country: body.crossCountry,
                sim_imc: body.simImc,
                actual_imc: body.actImc,
                night: body.night,
                day_landings: body.dayLandings,
                night_landings: body.nightLandings,
                holding: body.holding,
                approaches: body.approaches,
                dual_given: body.dualGiven,
                dual_recieved: body.dualRecieved,
                route: body.route,
                ipc: body.ipc ? 1 : 0, // convert boolean to tinyint
                checkride: body.checkride ? 1 : 0,
                flight_review: body.flightReview ? 1 : 0
    
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