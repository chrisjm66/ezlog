import express, { Request, Response } from 'express'
import { UserModel } from '../models/authModel'
import { populateUserInfo } from '../middlewares/auth'
import { updateInstructorStatus, InstructorSettings, updateUser, UserUpdate } from '../models/userModel'

const router = express.Router()

router.use(populateUserInfo)

router.put('/', async(req: Request, res: Response): Promise<any> => {
    const user: UserModel = res.locals.user
    const data: UserUpdate = req.body
    const status = await updateUser(data, user.userId)

    return res.sendStatus(status)
})

router.put('/instructor', async(req: Request, res: Response): Promise<any> => {
    const user: UserModel = res.locals.user
    const data: InstructorSettings = req.body
    const status = await updateInstructorStatus(data, user.userId)

    return res.sendStatus(status)
})

export default router