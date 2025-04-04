import express from "express";
import { UserAuth } from "../controllers/UserController";

const router = express.Router()

router.post('/reg', async (req, res) => {
    await UserAuth.userRegister(req, res)
})

router.post('/login', async (req, res) => {
    await UserAuth.UserLogin(req, res)
})

export default router;