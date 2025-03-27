import { Request, Response, NextFunction } from 'express'
import { Session } from "@prisma/client"
import { validateSession } from '../models/session'

export const populateUserInfo = async(req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.cookies.auth
    const {session, user} = await validateSession(token)
    
    if (!user) {
        return res.status(401).send().end()
    }
    res.locals.session = session
    res.locals.user = user

    next()
}

export const setAuthSesionCookie = async(req: Request, res: Response): Promise<any> => {
    const token = res.locals.sessionToken
    const session: Session = res.locals.session

    if (process.env.NODE_ENV === 'production') {
        // When deployed over HTTPS
        res.cookie('auth', token, {httpOnly: true, sameSite: "lax", expires: session.expires, path: '/', secure: true})
    } else {
        // When deployed over HTTP (localhost)
        res.cookie('auth', token, {httpOnly: true, sameSite: "lax", expires: session.expires, path: '/', secure: false})

    }
    return res.json(res.locals.user)
}

export const clearAuthSessionCookie = (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (process.env.NODE_ENV === 'production') {
        // When deployed over HTTPS
        res.clearCookie('auth', {httpOnly: true, sameSite: "lax", secure: true})
    } else {
        // When deployed over HTTP (localhost)
        res.clearCookie('auth', {httpOnly: true, sameSite: "lax", secure: false})

    }

    return res.sendStatus(200)
}
