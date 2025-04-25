import express, {type Request, type Response} from 'express'
import { populateUserInfo } from '../middlewares/auth'
import { UserModel } from '../models/authModel'
import { LogbookEntry as ClientLogbookEntry } from '../src/hooks/logbook'
import { addEntryToDatabase, deleteEntryFromDatabase, getLogbookEntries, updateLogbookEntry } from '../models/logbookModel'
const router = express.Router()

// puts users data in locals
router.use(populateUserInfo)

// get logbook data
router.get('/', async(req: Request, res: Response): Promise<any> => {
    const user: UserModel = res.locals.user

    const logbookEntries = await getLogbookEntries(user)

    res.json(logbookEntries)
})

router.post('/', async(req: Request, res: Response): Promise<any> => {
    const body: ClientLogbookEntry = req.body
    const user: UserModel = res.locals.user

    const insert = await addEntryToDatabase(user, body)
    if (insert) {
        return res.sendStatus(200)
    }

    res.sendStatus(400)
})

router.put('/', async(req: Request, res: Response): Promise<any> => {
    const body: ClientLogbookEntry = req.body
    const user: UserModel = res.locals.user
    console.log(body)
    const updateQuery = await updateLogbookEntry(user, body)

    if (updateQuery) {
        return res.sendStatus(200)
    }

    res.sendStatus(400)
})

router.delete('/', async(req: Request, res: Response): Promise<any> => {
    const entryId: number = req.body.entryId
    const user: UserModel = res.locals.user

    if (!entryId || !user) {
        res.statusMessage = 'No entryId or user found'
        return res.sendStatus(400)
    }

    await deleteEntryFromDatabase(user, entryId)

    res.sendStatus(204)
})

export default router