import prisma from "../middlewares/db";
import { UserModel } from "./authModel";

export const updateInstructorStatus = async (data: InstructorSettings, userId: number): Promise<number> => {
    await prisma.user.update({
        where: {
            user_id: userId
        },
        data: {
            is_instructor: data.isInstructor,
            instructor_cid: data.instructorId as number,
            instructor_expiry_date: data.expirationDate
        }
    })

    return 200
}

export type InstructorSettings = {
    isInstructor: boolean
    instructorId: number
    expirationDate: string
}