import express from 'express'
import createHttpError from 'http-errors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({
    path: path.resolve(__dirname, './.env')
})

const app = express()
const PORT = process.env.PORT || 5000
app.use(morgan("dev"))

app.get("/", (req, res, next) => {
    res.send("Working")
})

app.use((req, res, next) => {
    next(createHttpError.NotFound())
})

app.use((error, req, res, next) => {
    error.status = error.status || 500

    res.status(error.status)
    res.send(error)
})


app.listen(PORT, () => console.log('Server running on port ' + PORT))