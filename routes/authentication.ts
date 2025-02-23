import express, {Request, Response} from 'express'
import cors from 'cors'
const router = express.Router()

router.use(cors())

router.get('/login', (req: Request, res: Response) => {
    res.send('works')
})

router.post('/register', (req: Request, res: Response) => {
    console.log('used')
    res.send('works')
})

export default router