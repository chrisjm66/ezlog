import express, {type Request, type Response, type NextFunction} from 'express'
import { populateUserInfo } from '../middlewares/auth'
import prisma from '../middlewares/db'

const router = express.Router()

router.use(populateUserInfo)

// get logbook data
router.post('/', async(req: Request, res: Response, next: NextFunction): Promise<any> => {
    const body = req.body
    const user = res.locals.user

    if (!user) {
        return res.status(401).send()
    }

    await prisma.logbookEntry.create({
        data: {
            aircraftId: body.aircraftId,
            totalTime:
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
    next()
})

export default router