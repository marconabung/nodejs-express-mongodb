import express from "express"
import createHttpError from "http-errors"
import { connect } from "mongoose"
import morgan from "morgan"
import dotenv from "dotenv"
import path from "path"
import url from "url"

import { router as mainRouter } from "./routers/index.route.js"
import { router as authRouter } from "./routers/auth.route.js"
import { router as userRouter } from "./routers/user.route.js"

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({
    path: path.resolve(__dirname, "./.env")
})

const app = express()
const PORT = process.env.PORT || 5000
app.use(morgan("dev"))
app.set("view engine", "ejs")

// ROUTERS
app.use("/", mainRouter)
app.use("/auth", authRouter)
app.use("/users", userRouter)


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
}).then(() => {

    console.log("Connected")
    app.listen(PORT, () => console.log("Server running on port " + PORT))
}).catch(err => console.log(err))