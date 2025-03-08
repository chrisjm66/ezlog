import { Request, Response, NextFunction } from 'express'
import { Session } from "@prisma/client"
import { validateSession } from '../models/session'

export const populateUserInfo = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.auth
    const {session, user} = await validateSession(token)
    
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

export const clearAuthSessionCookie = (req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === 'production') {
        // When deployed over HTTPS
        res.clearCookie('auth', {httpOnly: true, sameSite: "lax", expires: new Date(Date.now() + 300000), path: '/', secure: true})
    } else {
        // When deployed over HTTP (localhost)
        res.clearCookie('auth', {httpOnly: true, sameSite: "lax", expires: new Date(Date.now() + 300000), path: '/', secure: false})

    }

    next()
}
