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

    // Check that user input is valid and that user doesnt exist
    if (!isRegristrationInputValid(userData)) {
        console.log('Signup failed - input validation')
        res.status(400).send('User info invalid')
        return
    } else if (await userExists(userData.email)) {
        console.log('Signup failed - user already exists')
        res.status(400).send('User already exists')
        return
    }

    // create user and session
    const user_id = await createUser(userData)
    const sessionToken = generateSessionToken()

    res.status(200).send('<Redirect to={"/"}/>')
})


export default router