import prisma from "../middlewares/db";

export const updateUser = async (data: UserUpdate, userId: number): Promise<number> => {
    await prisma.user.update({
        where: {
            user_id: userId
        },
        data: {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email
        }
    })

    return 200
}

export const updateInstructorStatus = async (data: InstructorSettings, userId: number): Promise<number> => {
    await prisma.user.update({
        where: {
            user_id: userId
        },
        data: {
            is_instructor: data.isInstructor,
            instructor_cid: data.instructorId,
            instructor_expiry_date: data.expirationDate
        }
    })

    return 200
}

export type InstructorSettings = {
    isInstructor: boolean
    instructorId: string
    expirationDate: string
}

export type UserUpdate = {
    firstName: string
    lastName: string
    email: string
}