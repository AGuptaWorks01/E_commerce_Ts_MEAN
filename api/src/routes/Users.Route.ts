import express from "express";
import { UserAuth } from "../controllers/User.Controller";
import { authMiddleWare, authorizeRoles } from "../middlewares/verifyToken";
import { User } from "../entities/User.Entitie";


const router = express.Router()

router.post('/register', async (req, res) => {
    await UserAuth.userRegister(req, res)
})

router.post('/login', async (req, res, next) => {
    await UserAuth.UserLogin(req, res, next)
})




// Apply middleware for routes accessible by admin only
router.use('/admin', authMiddleWare, authorizeRoles('admin'));
router.get('/admin/users', UserAuth.getAllUser);

// Apply for admin + seller
router.use('/admin-seller', authMiddleWare, authorizeRoles('admin', 'seller'));
router.get('/admin-seller/users', UserAuth.getAllUser);

// Apply for admin + seller + user
router.use('/all', authMiddleWare, authorizeRoles('admin', 'seller', 'user'));
router.get('/all/users', UserAuth.getAllUser);


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