import express, {NextFunction, Request, Response} from 'express'
import {type RegisterRequest, type LoginRequest, userExists, isRegristrationInputValid, createUser, validateUser, getUserByEmail, UserModel} from '../models/authModel.ts'
import { createWebSession, generateSessionToken, validateSession, invalidateSession } from '../models/session.ts'
import { setAuthSesionCookie, clearAuthSessionCookie } from '../middlewares/auth.ts'

const router = express.Router()

router.get('/validate', async(req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.cookies.auth

    if (!token) {
        return res.status(401).send()
    }

    const {session, user} = await validateSession(token)

    if (!session || !user) {
        return res.status(401).send()
    }

    res.locals.sessionToken = token
    res.locals.session = session
    res.locals.user = user
    next()
}, setAuthSesionCookie)

// login request
router.post('/login', async(req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userData: LoginRequest = req.body

    if(!await validateUser(userData)) {
        return res.status(401).send().end()
    }

    const user: UserModel | null = await getUserByEmail(userData.email) // this theoretically would never be null since validateUser returns false if user is null\
    if (user) {
        const userId: number = user?.userId
    
        const sessionToken: string = generateSessionToken()
        const session = await createWebSession(sessionToken, userId)
        
        // pass to middleware
        res.locals.sessionToken = sessionToken
        res.locals.session = session
        res.locals.user = user
        next()
    } else {
        return res.status(500).send().end()
    }
}, setAuthSesionCookie)

// logout request
router.post('/logout', async(req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userData: UserModel = req.body

    if(!userData) {
        return res.status(401).send().end()
    }

    const sessionToken: string = req.cookies.auth
    console.log(sessionToken)
    await invalidateSession(sessionToken)
    
    next()
}, clearAuthSessionCookie)

// register request
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
    const user: UserModel = await createUser(userData)
    const sessionToken: string = generateSessionToken()
    const session = await createWebSession(sessionToken, user.userId)

    // pass to middleware
    res.locals.sessionToken = sessionToken
    res.locals.session = session
    res.locals.user = user
    next()
}, setAuthSesionCookie)


export default router
