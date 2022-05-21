import express from "express";
import { BookController } from "../controllers/book.controller";
const router = express.Router();

router.get("/api/books", async (req, res, next) => {
    return await BookController.getBooks(req, res);
})

router.post("/api/books", async (req, res, next) => {
    return await BookController.storeBook(req, res);
})

router.get("/api/books/:id", async (req, res, next) => {
    return await BookController.getBook(req, res);
})

router.put("/api/books/:id", async (req, res, next) => {
    return await BookController.updateBook(req, res);
})

router.delete("/api/books/:id", async (req, res, next) => {
    return await BookController.deleteBook(req, res);
})

export default router;