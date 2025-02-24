import express, {NextFunction, Request, Response} from 'express'
import {type RegisterRequest, userExists, isRegristrationInputValid, createUser} from '../models/authModel.ts'
import { createWebSession, generateSessionToken, setSessionToken } from '../models/session.ts'
import cors from 'cors'
const router = express.Router()

router.use(cors())

router.get('/login', (req: Request, res: Response) => {
    res.send('works')
})

router.post('/register', async(req: Request, res: Response, next: NextFunction) => {
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
    const userId: number = await createUser(userData)
    const sessionToken: string = generateSessionToken()
    const session = await createWebSession(sessionToken, userId)

    // pass to middleware
    res.locals.sessionToken = sessionToken
    res.locals.session = session
    next()
}, setSessionToken)


export default router