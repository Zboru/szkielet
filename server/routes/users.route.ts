import express from "express";
import { UserController } from "../controllers/user.controller";
import { authenticateToken } from "../middleware/auth.middleware";
const router = express.Router();

router.get('/api/users', authenticateToken, async (req, res, next) => {
    return await UserController.getUsers(req, res);
})

router.post('/api/users', async (req, res, next) => {
    return await UserController.storeUser(req, res);
})

export default router;