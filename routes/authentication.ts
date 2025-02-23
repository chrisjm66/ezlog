import express, {Request, Response} from 'express'
import {type RegisterRequest, userExists, isRegristrationInputValid, createUser} from '../models/authModel.ts'
import cors from 'cors'
const router = express.Router()

router.use(cors())

router.get('/login', (req: Request, res: Response) => {
    res.send('works')
})

router.post('/register', async(req: Request, res: Response) => {
    const userData: RegisterRequest = req.body

    if (!await userExists(userData.email) && isRegristrationInputValid(userData)) {
        const user_id = await createUser(userData)
        res.send(user_id)
    } else {
        res.status(400)
    }

    console.log(userData)
    res.status(500)
})


export default router