import express from "express"
import createHttpError from "http-errors"
import { connect } from "mongoose"
import morgan from "morgan"
import dotenv from "dotenv"
import path from "path"
import cors from 'cors'
import url from "url"

import { 
    mainRouter, authRouter, userRouter,
    aboutPageRouter
} from './_routing.js'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({
    path: path.resolve(__dirname, "./.env")
})

const app = express()
const PORT = process.env.PORT || 5000
app.use(morgan("dev"))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.set("view engine", "ejs")

// ROUTERS
app.use("/", mainRouter)
app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/about", aboutPageRouter)


app.use((req, res, next) => {
    next(createHttpError.NotFound())
})

app.use((error, req, res, next) => {
    error.status = error.status || 500
    
    res.status(error.status)
    res.send(error)
})

connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
    // useNewURLParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
}, () => {

    app.listen(PORT, () => console.log("Server running on port " + PORT))
})