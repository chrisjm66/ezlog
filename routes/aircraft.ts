import express, {type Request, type Response} from 'express'
import { populateUserInfo } from '../middlewares/auth'
import { getAircraftList } from '../models/aircraftModel'
import { UserModel } from '../models/authModel'
import { Aircraft } from '@prisma/client'
import { Aircraft as ClientAircraft } from '../src/hooks/aircraft'
const router = express.Router()

router.use(populateUserInfo)

router.get('/', async(req: Request, res: Response) => {
    const user: UserModel = res.locals.user

    const queryData: Aircraft[] = await getAircraftList(user.userId)

    // convert to client version
    const responseData: ClientAircraft[] = [] as ClientAircraft[]

    for(let i = 0; i < queryData.length; i++) {
        const data = queryData[i]

        responseData.push({
            aircraft_id: data.aircraft_id,
            tail_number: data.tail_number,
            description: data.description,
            make: data.make,
            type_code: data.type_code,
            model: data.make,
            engine_type: data.engine_type,
            taa: data.taa as boolean,
            complex: data.complex as boolean,
            high_performance: data.high_performance as boolean,
        })
    }

})

export default router