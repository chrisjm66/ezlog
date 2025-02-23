import express, {Express, Request, Response } from "express"
import dotenv from 'dotenv'
import path, {dirname} from 'path'
import { fileURLToPath } from "url"
import prisma from './middlewares/db.ts'
import apiRouter from './routes/apiRouter.ts'


// env
dotenv.config()

const app: Express = express()
const port = process.env.PORT || 8100
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json())
app.use(express.urlencoded())

app.use(express.static(path.join(__dirname, 'dist', 'index.html')))
console.log(path.join(__dirname, 'dist', 'index.html'))

app.use('/api', apiRouter)

if (process.env.NODE_ENV == 'development') {
    app.get('*', (req: Request, res: Response) => {
        console.log(req.path)
        res.send("unknown route")
    })
} else {
    app.use(express.static(path.join(__dirname, 'dist')))

    app.get('*', (req :Request, res: Response) => {
        console.log(req.path)
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    })
}



const server = app.listen(port, () => {
    console.log("listening on port " + port)
})