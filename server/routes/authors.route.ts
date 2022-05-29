import express from "express";
import { AuthorController } from "../controllers/author.controller";
import { authenticateToken } from "../middleware/auth.middleware";
const router = express.Router();

router.get("/api/authors", authenticateToken, async (req, res, next) => {
    return await AuthorController.getAuthors(req, res);
})

router.post("/api/authors", authenticateToken, async (req, res, next) => {
    return await AuthorController.storeAuthor(req, res);
})

router.get("/api/authors/:id", authenticateToken, async (req, res, next) => {
    return await AuthorController.getAuthor(req, res);
})

router.put("/api/authors/:id", authenticateToken, async (req, res, next) => {
    return await AuthorController.updateAuthor(req, res);
})

router.delete("/api/authors/:id", authenticateToken, async (req, res, next) => {
    return await AuthorController.deleteAuthor(req, res);
})

export default router;