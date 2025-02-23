import express from 'express'
import authentication from './authentication.ts'
const router = express.Router()

router.use('/auth', authentication)

export default router