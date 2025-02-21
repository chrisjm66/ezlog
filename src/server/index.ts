import express, {Application, Request, Response } from "express"
import dotenv from 'dotenv'
import path, {dirname} from 'path'
import { fileURLToPath } from "url"

// env
dotenv.config()

const app: Application = express()
const port = process.env.PORT || 8100
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')))

if (process.env.NODE_ENV == 'development') {
    app.get('/*', (req : Request, res: Response) => {
        res.send('hi')
    })
} else {
    app.use(express.static(path.join(__dirname, 'dist')))

    app.get('/*', (req : Request, res: Response) => {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    })
}

app.listen(port, () => {
    console.log("listening on port " + port)
})
