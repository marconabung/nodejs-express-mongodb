import { router as mainRouter } from "./routers/index.route.js"
import { router as authRouter } from "./routers/auth.route.js"
import { router as userRouter } from "./routers/user.route.js"

// PAGES
import { router as aboutPageRouter } from './routers/pages/about.route.js'

export {
    mainRouter, authRouter, userRouter,
    aboutPageRouter
}