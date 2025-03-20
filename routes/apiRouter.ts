import express from 'express'
import authentication from './authentication.ts'
import logbook from './logbook.ts'
import aircraft from './aircraft.ts'
const router = express.Router()

router.use('/auth', authentication)
router.use('/logbook', logbook)
router.use('/aircraft', aircraft)

export default router