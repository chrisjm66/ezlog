import express, {type Request, type Response} from 'express'
import { populateUserInfo } from '../middlewares/auth'
import { getAircraftList, addAircraft, deleteAircraft, updateAircraft } from '../models/aircraftModel'
import { UserModel } from '../models/authModel'
import { Aircraft } from '@prisma/client'
import { Aircraft as ClientAircraft } from '../src/hooks/aircraft'
const router = express.Router()

router.use(populateUserInfo)

router.get('/', async(req: Request, res: Response): Promise<any> => {
    const user: UserModel = res.locals.user

    const queryData: Aircraft[] | null = await getAircraftList(user.userId)

    if (!queryData) {
        return res.sendStatus(500)
    }

    // convert to client version
    const responseData: ClientAircraft[] = [] as ClientAircraft[]

    for(let i = 0; i < queryData.length; i++) {
        const data = queryData[i]

        responseData.push({
            aircraftId: data.aircraft_id,
            tailNumber: data.tail_number,
            description: data.description,
            make: data.make,
            typeCode: data.type_code,
            model: data.model,
            numberOfEngines: data.number_of_engines,
            engineType: data.engine_type,
            taa: data.taa as boolean,
            complex: data.complex as boolean,
            highPerformance: data.high_performance as boolean,
        })
    }

    res.json(responseData)
})

router.post('/', async(req: Request, res: Response): Promise<any> => {
    const user: UserModel = res.locals.user
    console.log(req.body)
    const queryData: Aircraft = await addAircraft(req.body, user.userId)

    if (queryData) {
        return res.sendStatus(200)
    } else {
        return res.sendStatus(500)
    }
})

router.put('/', async(req: Request, res: Response): Promise<any> => {
    const user: UserModel = res.locals.user

    const queryData: Aircraft = await updateAircraft(req.body, user.userId)

    if (queryData) {
        return res.sendStatus(200)
    } else {
        return res.sendStatus(500)
    }
})

router.delete('/', async(req: Request, res: Response): Promise<any> => {
    const user: UserModel = res.locals.user

    const queryData = await deleteAircraft(req.body, user.userId)

    if (queryData) {
        return res.sendStatus(queryData)
    }
})

export default router