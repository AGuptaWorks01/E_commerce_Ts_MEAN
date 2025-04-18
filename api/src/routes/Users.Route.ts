import express from "express";
import { UserAuth } from "../controllers/User.Controller";
import { authMiddleWare, authorizeRoles } from "../middlewares/verifyToken";

const router = express.Router()

router.post('/register', async (req, res) => {
    await UserAuth.userRegister(req, res)
})

router.post('/login', async (req, res, next) => {
    await UserAuth.UserLogin(req, res, next)
})

// Apply middleware for routes accessible by admin only
router.use('/', authMiddleWare, authorizeRoles('admin'));
router.get('/admin', UserAuth.getAllUser);

// Apply for admin + seller
router.use('/', authMiddleWare, authorizeRoles('admin', 'seller'));
router.get('/admin-seller', UserAuth.getAllUser);

// Apply for admin + seller + user
router.use('/', authMiddleWare, authorizeRoles('admin', 'seller', 'user'));
router.get('/all', UserAuth.getAllUser);


// ============================ Alternative Way ======================================

// router.get('/admin/users', authMiddleWare, authorizeRoles('admin'), async (req, res, next) => {
//     await UserAuth.getAllUser(req, res, next)
// })

// router.get('/admin-seller/users', authMiddleWare, authorizeRoles('admin', 'seller'), async (req, res, next) => {
//     await UserAuth.getAllUser(req, res, next)
// })

// router.get('/all/users', authMiddleWare, authorizeRoles('admin', 'seller', 'user'), async (req, res, next) => {
//     await UserAuth.getAllUser(req, res, next)
// })


export default router;