import express from "express";
import { UserAuth } from "../controllers/User.Controller";
import { authMiddleWare, authorizeRoles } from "../middlewares/verifyToken";

const router = express.Router()

router.post('/register', async (req, res, next) => {
    await UserAuth.userRegister(req, res, next)
})

router.post('/login', async (req, res, next) => {
    await UserAuth.UserLogin(req, res, next)
})

router.get('/A', authMiddleWare, authorizeRoles('admin'), async (req, res, next) => {
    await UserAuth.getAllUser(req, res, next)
})

router.get('/AS', authMiddleWare, authorizeRoles('admin', 'seller'), async (req, res, next) => {
    await UserAuth.getAllUser(req, res, next)
})

router.get('/ASU', authMiddleWare, authorizeRoles('admin', 'seller', 'user'), async (req, res, next) => {
    await UserAuth.getAllUser(req, res, next)
})

export default router;