import express from "express";
import { BookController } from "../controllers/book.controller";
import { authenticateToken } from "../middleware/auth.middleware";
const router = express.Router();

router.get("/api/books", authenticateToken, async (req, res, next) => {
    return await BookController.getBooks(req, res);
})

router.post("/api/books", authenticateToken, async (req, res, next) => {
    return await BookController.storeBook(req, res);
})

router.get("/api/books/:id", authenticateToken, async (req, res, next) => {
    return await BookController.getBook(req, res);
})

router.put("/api/books/:id", authenticateToken, async (req, res, next) => {
    return await BookController.updateBook(req, res);
})

router.delete("/api/books/:id", authenticateToken, async (req, res, next) => {
    return await BookController.deleteBook(req, res);
})

export default router;