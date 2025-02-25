import express, {Express, Request, Response } from "express"
import dotenv from 'dotenv'
import path, {dirname} from 'path'
import { fileURLToPath } from "url"
import apiRouter from './routes/apiRouter.ts'
import cors from 'cors'

// env
dotenv.config()
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:8100', 'http://chrismangan.net'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204,
    exposedHeaders: 'Set-Cookie',
    allowedHeaders: 'Authorizaton,Content-Type',
    credentials: false,
    preflight: false
}
const app: Express = express()
const port = process.env.PORT || 8100
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, 'dist', 'index.html')))

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