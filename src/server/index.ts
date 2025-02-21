import express, {Express, Response } from "express"
import dotenv from 'dotenv'
import path, {dirname} from 'path'
import { fileURLToPath } from "url"
import vite from 'vite-express'

// env
dotenv.config()

const app: Express = express()
const port = process.env.PORT || 8100
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, '..', '..', 'public')))

if (process.env.NODE_ENV == 'development') {
    app.get('/*', (res: Response) => {
        res.send('hi')
    })
} else {
    app.use(express.static(path.join(__dirname, 'dist')))

    app.get('/*', (res: Response) => {
        res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
    })
}

const server = app.listen(port, () => {
    console.log("listening on port " + port)
})

vite.bind(app, server)