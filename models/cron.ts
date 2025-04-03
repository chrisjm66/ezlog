import cron from 'node-cron'
import { purgeSessions } from './authModel'

cron.schedule('0 * * * *', () => { // every hour
    purgeSessions()
})