import { Router } from "express"

const router = Router()

router.get("/me", (req, res, next) => {
    res.send("Me!")
})

export { router }