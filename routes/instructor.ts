import express, { Request, Response } from 'express'
import { populateUserInfo } from '../middlewares/auth'
import { UserModel } from '../models/authModel'
import { LogbookEntry as ClientLogbookEntry } from '../src/hooks/logbook'
import { updateLogbookEntry, submitSignature } from '../models/logbookModel'

const router = express.Router()

router.use(populateUserInfo)

router.post('/sign', async(req: Request, res: Response): Promise<any> => {
    const user: UserModel = res.locals.user

    if (user.userId !== -1 && user.isInstructor) {
        const {entry, canvasData}: {entry: ClientLogbookEntry, canvasData: JSON} = req.body

        if (!entry || !canvasData) {
            return res.status(400).send('Missing entryId or canvasData').end()
        }

        if (entry.instructor?.userId !== user.userId) {
            return res.status(401).send('You are not the instructor for this entry').end()
        }

        await updateLogbookEntry(entry.user, entry)
        await submitSignature(entry, canvasData)

        return res.sendStatus(200).end()
    }
})

export default router