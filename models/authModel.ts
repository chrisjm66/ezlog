import { User } from "@prisma/client"
import prisma from "../middlewares/db"
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 12

// private functions
export const generateHash = (plainTextPassword: string): string => {
    bcrypt.hash(plainTextPassword, SALT_ROUNDS, (err: Error | undefined, hash: string) => {
        if (err) {
            console.error(err.stack)
            throw err
        }

        return hash
    })
    throw new Error('generateHash')
}

export const userExists = async(email: string): Promise<boolean> => {
    if (await prisma.user.findFirst({where: {email: email}})) {
        return true
    }

    return false
}

export const isRegristrationInputValid = (userData: RegisterRequest): boolean => {
    return true
}

export const createUser = async(userData: RegisterRequest) => {
    const hashedPassword: string = generateHash(userData.password)

    const newUser: User = await prisma.user.create({
        data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            email: userData.email,
            password: hashedPassword,
        }
    })

    if (!newUser) { throw new Error('Error generating new user.') }

    return newUser.user_id
}


export type RegisterRequest = {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
}