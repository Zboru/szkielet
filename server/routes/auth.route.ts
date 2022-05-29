import express from "express";
import { AuthController } from "../controllers/auth.controller";
const router = express.Router();

router.post('/api/auth', async (req, res, next) => {
    return await AuthController.loginUser(req, res);
})

export default router;