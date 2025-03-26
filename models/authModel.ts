import { User } from "@prisma/client"
import prisma from "../middlewares/db"
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 12

// private functions
export const generateHash = async(plainTextPassword: string): Promise<string> => {
    const hash: string = await bcrypt.hash(plainTextPassword, SALT_ROUNDS)
    return hash
}

export const userExists = async(email: string): Promise<boolean> => {
    if (await prisma.user.findFirst({where: {email: email}})) {
        return true
    }

    return false
}

export const isRegristrationInputValid = (userData: RegisterRequest): boolean => {
    if (userData.email.includes('@') && userData.password == userData.confirmPassword) {
        return true
    } else {
        return false
    }
}

export const createUser = async(userData: RegisterRequest): Promise<UserModel> => {
    const hashedPassword: string = await generateHash(userData.password)

    const newUser: User = await prisma.user.create({
        data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            email: userData.email,
            password: hashedPassword,
        }
    })

    const newUserModel: UserModel = {
        firstName: newUser.first_name,
        lastName: newUser.last_name,
        email: newUser.email,
        userId: newUser.user_id,
        isInstructor: newUser?.is_instructor,
        instructorCid: newUser.instructor_cid,
        instructorExpiryDate: newUser.instructor_expiry_date
    }

    if (!newUser) { throw new Error('Error generating new user.') }

    return newUserModel
}

export const getUser = async(userId: number): Promise<UserModel | null> => {
    const result = await prisma.user.findUnique({
        where: {user_id: userId}
    })

    if (!result) {return null}

    const user: UserModel = {
        firstName: result?.first_name,
        lastName: result?.last_name,
        email: result?.email,
        userId: result?.user_id,
        isInstructor: result?.is_instructor,
        instructorCid: result.instructor_cid,
        instructorExpiryDate: result.instructor_expiry_date
    }

    return user
}

export const getUserByEmail = async(email: string): Promise<UserModel | null> => {
    const result = await prisma.user.findFirst({
        where: {email: email}
    })

    if (!result) {return null}

    const user: UserModel = {
        firstName: result?.first_name,
        lastName: result?.last_name,
        email: result?.email,
        userId: result?.user_id,
        isInstructor: result?.is_instructor,
        instructorCid: result.instructor_cid,
        instructorExpiryDate: result.instructor_expiry_date
    }

    return user
}

export const validateUser = async(loginRequest: LoginRequest): Promise<boolean> => {
    const user: User | null = await prisma.user.findFirst({where: {email: loginRequest.email}})

    if(!user) {
        return false
    }

    return bcrypt.compare(loginRequest.password, user.password)
}

// this exists to we arent sending a password around everywhere
export type UserModel = {
    firstName: string
    lastName: string
    email: string
    userId: number
    isInstructor: boolean
    instructorCid: number | null
    instructorExpiryDate: string | null
}

export type RegisterRequest = {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
}

export type LoginRequest = {
    email: string
    password: string
}