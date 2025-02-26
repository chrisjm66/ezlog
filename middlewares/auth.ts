import { Request, Response, NextFunction } from 'express'
import { Session } from "@prisma/client"

export const setAuthSesionCookie = (req: Request, res: Response, next: NextFunction) => {
    const token = res.locals.sessionToken
    const session: Session = res.locals.session

    if (process.env.NODE_ENV === 'production') {
        // When deployed over HTTPS
        res.cookie('auth', token, {httpOnly: true, sameSite: "lax", expires: session.expires, path: '/', secure: true})
    } else {
        // When deployed over HTTP (localhost)
        res.cookie('auth', token, {httpOnly: true, sameSite: "lax", expires: session.expires, path: '/', secure: false})

    }
    res.json(res.locals.user)
    res.status(200)
    next()
}

export const clearAuthSessionCookie = (req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === 'production') {
        // When deployed over HTTPS
        res.cookie('auth', ' ', {httpOnly: true, sameSite: "lax", expires: new Date(Date.now() + 300000), path: '/', secure: true})
    } else {
        // When deployed over HTTP (localhost)
        res.cookie('auth', ' ', {httpOnly: true, sameSite: "lax", expires: new Date(Date.now() + 300000), path: '/', secure: false})

    }

    res.status(200).send()
    next()
}