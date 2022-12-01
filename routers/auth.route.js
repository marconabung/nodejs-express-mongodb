import { Router } from "express"

const router = Router()

router.get("/login", (req, res, next) => {
    res.send("Login!!")
})

router.get("/register", (req, res, next) => {
    res.send("Register!!")
})

router.post("/login", (req, res, next) => {
    res.send("Login!!")
})

router.post("/register", (req, res, next) => {
    res.send("Register!!")
})

router.get("/logout", (req, res, next) => {
    res.send("Register!!")
})
export { router }