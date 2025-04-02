import express from 'express'
import authentication from './authentication.ts'
import logbook from './logbook.ts'
import aircraft from './aircraft.ts'
import user from './user.ts'
import instructor from './instructor.ts'

const router = express.Router()

router.use('/auth', authentication)
router.use('/logbook', logbook)
router.use('/aircraft', aircraft)
router.use('/user', user)
router.use('/instructor', instructor)

export default router