import { Router } from "express"

const router = Router()

router.get("/", (req, res, next) => {
    res.render("pages/about")
})


export { router }
