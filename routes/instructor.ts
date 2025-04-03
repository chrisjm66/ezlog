import express, { Request, Response } from 'express'
import { populateUserInfo } from '../middlewares/auth'
import { UserModel } from '../models/authModel'
import { LogbookEntry as ClientLogbookEntry } from '../src/hooks/logbook'
import { updateLogbookEntry, submitSignature, addInstructorRequest, clearInstructorAndSignature } from '../models/logbookModel'
import { getUserByEmail } from '../models/authModel'

const router = express.Router()

router.use(populateUserInfo)

router.post('/sign', async(req: Request, res: Response): Promise<any> => {
    const user: UserModel = res.locals.user

    if (user.userId !== -1 && user.isInstructor) {
        const {entry, canvasData}: {entry: ClientLogbookEntry, canvasData: JSON} = req.body

        if (!entry || !canvasData) {
            res.statusMessage = 'Missing entryId or canvasData'
            return res.status(400).send().end()
        }

        if (entry.instructor?.userId !== user.userId) {
            res.statusMessage = 'You are not the instructor for this entry'
            return res.status(400).send().end()
        }

        await updateLogbookEntry(entry.user, entry)
        await submitSignature(entry, canvasData)

        return res.sendStatus(200).end()
    }
    return res.sendStatus(500).end()
})

router.put('/request', async(req: Request, res: Response): Promise<any> => {
    const user: UserModel = res.locals.user

    if (!user.userId || user.userId == -1) {
        return res.sendStatus(401).end()
    }

    const {entryId, instructorEmail}: {entryId: number, instructorEmail: string} = req.body
    const instructor: UserModel | null = await getUserByEmail(instructorEmail)

    
    if (!entryId) {
        res.statusMessage = 'Missing entryId'
        return res.status(400).send().end()
    }

    if (!instructor) {
        res.statusMessage = 'Requested user not found.'
        return res.status(400).send().end()
    }

    if (!instructor.isInstructor) {
        res.statusMessage = 'Requested user is not set as instructor.'
        return res.status(400).send().end()
    }

    if (user.userId == instructor.userId && !(process.env.NODE_ENV == 'development')) {
        res.statusMessage = 'Unable to request signature from yourself.'
        return res.status(400).send().end()
    }

    
    if (!await addInstructorRequest(entryId, user, instructor.userId)) {
        res.statusMessage = 'Database entry failed.'
        return res.status(400).send().end()
    }

    return res.sendStatus(200).end()    
})

router.delete('/request', async(req: Request, res: Response): Promise<any> => {
    const user: UserModel = res.locals.user
    const {entryId}: {entryId: number} = req.body

    if (!user.userId || user.userId == -1) {
        return res.sendStatus(401).end()
    }

    if (!entryId) {
        res.statusMessage = 'Missing entryId'
        return res.status(400).send().end()
    }

    if (!await clearInstructorAndSignature(entryId, user)) {
        res.statusMessage = 'Database entry failed.'
        return res.status(400).send().end()
    }

    return res.sendStatus(200).end()
})

export default router