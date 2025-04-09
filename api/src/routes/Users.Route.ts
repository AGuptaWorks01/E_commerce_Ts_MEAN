import express from "express";
import { UserAuth } from "../controllers/User.Controller";
import { authMiddleWare, authorizeRoles } from "../middlewares/verifyToken";

const router = express.Router()

router.post('/register', async (req, res) => {
    await UserAuth.userRegister(req, res)
})

router.post('/login', async (req, res) => {
    await UserAuth.UserLogin(req, res)
})

router.get('/A', authMiddleWare, authorizeRoles('admin'), async (req, res) => {
    await UserAuth.getAllUser(req, res)
})
router.get('/AS', authMiddleWare, authorizeRoles('admin', 'seller'), async (req, res) => {
    await UserAuth.getAllUser(req, res)
})
router.get('/ASU', authMiddleWare, authorizeRoles('admin', 'seller', 'user'), async (req, res) => {
    await UserAuth.getAllUser(req, res)
})

export default router;