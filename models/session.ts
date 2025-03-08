import crypto from "crypto"
import { getUser, UserModel } from "./authModel"
import { Session } from "@prisma/client"
import prisma from "../middlewares/db"

// Thanks a lot to lucia-auth for the great resources to make these 2 functions.
const generateSessionHash = (input: string): string => {
    if (!input) {
        return ''
    }
    return crypto.createHash('sha256').update(input).digest("hex")
}

export const generateSessionToken = () => {
    const token = crypto.randomBytes(20).toString()
    return token
}

export const createWebSession = async(token: string, userId: number): Promise<Session> => {
    // session ID (stored in the DB) is the hash of the session token. this is so if DB leaked sessions cannot be stolen b/c hashing is one way
    let sessionId: string = generateSessionHash(token)

    const session: Session = {
        session_id: sessionId,
        user_id: userId,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30 days from today
    }

    await prisma.session.create({
        data: session
    })

    return session
}

export const validateSession = async(token: string): Promise<SessionResult> => {
    // get session id hash, which is what stored in DB
    const sessionId: string = generateSessionHash(token)

    // get session and user, make sure they exist
    const session: Session | null = await prisma.session.findUnique({
		where: {
			session_id: sessionId
        }
	});

    if (!session) {
        return {session: null, user: null}
    }

    const user: UserModel | null = await getUser(session.user_id)

    if (!user) {return {session: null, user: null}}

    // check session not expired
    if (Date.now() >= session.expires.getTime()) {
        await prisma.session.delete({where: {session_id: sessionId}})
        {return {session: null, user: null}}
    }

    if (Date.now() >= session.expires.getTime() - 1000 * 60 * 60 * 24 * 15) { // 15 days from current time
        session.expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days from today
        await prisma.session.update({
            where: {
                session_id: sessionId
            },
            data: {
                expires: session.expires
            }
        })
    }

    return {session: session, user: user}
}

export const invalidateSession = async(token: string): Promise<void> => {
    const sessionId: string = generateSessionHash(token)
    await prisma.session.deleteMany({
        where: {
            session_id: sessionId
        }
    })
}


export const invalidateAllSessions = async(userId: number): Promise<void> => {
    await prisma.session.deleteMany({
        where: {
            user_id: userId
        }
    })
}

type SessionResult = {session: Session, user: UserModel } | {session: null, user: null}
