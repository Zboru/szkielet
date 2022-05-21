import express from "express";
import { AuthorController } from "../controllers/author.controller";
const router = express.Router();

router.get("/api/authors", async (req, res, next) => {
    return await AuthorController.getAuthors(req, res);
})

router.post("/api/authors", async (req, res, next) => {
    return await AuthorController.storeAuthor(req, res);
})

router.get("/api/authors/:id", async (req, res, next) => {
    return await AuthorController.getAuthor(req, res);
})

router.put("/api/authors/:id", async (req, res, next) => {
    return await AuthorController.updateAuthor(req, res);
})

router.delete("/api/authors/:id", async (req, res, next) => {
    return await AuthorController.deleteAuthor(req, res);
})

export default router;