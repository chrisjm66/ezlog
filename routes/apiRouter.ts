import express from 'express'
import authentication from './authentication.ts'
import logbook from './logbook.ts'
const router = express.Router()

router.use('/auth', authentication)
router.use('/logbook', logbook)

export default router