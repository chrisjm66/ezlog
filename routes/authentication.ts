import express, {NextFunction, Request, Response} from 'express'
import {type RegisterRequest, type LoginRequest, userExists, isRegristrationInputValid, createUser, validateUser, getUser, getUserByEmail, UserModel} from '../models/authModel.ts'
import { createWebSession, generateSessionToken, setSessionToken } from '../models/session.ts'
import cors from 'cors'
const router = express.Router()

router.use(cors())

router.post('/login', async(req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userData: LoginRequest = req.body

    if(!await validateUser(userData)) {
        return res.status(401).send().end()
    }

    const user: UserModel | null = await getUserByEmail(userData.email) // this theoretically would never be null since validateUser returns false if user is null\
    if (user) {
        const userId: number = user?.userId
    
        const sessionToken: string = generateSessionToken()
        const session = await createWebSession(sessionToken, user?.userId)
        
        // pass to middleware
        res.locals.sessionToken = sessionToken
        res.locals.session = session
        next()
    } else {
        return res.status(500).send().end()
    }
}, setSessionToken)

router.post('/register', async(req: Request, res: Response, next: NextFunction) => {
    const userData: RegisterRequest = req.body

    // Check that user input is valid and that user doesnt exist
    if (!isRegristrationInputValid(userData)) {
        console.log('Signup failed - input validation')
        res.status(400).send('User info invalid').end()
        return
    } else if (await userExists(userData.email)) {
        console.log('Signup failed - user already exists')
        res.status(400).send('User already exists').end()
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