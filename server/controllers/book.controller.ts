import { Request, Response } from "express";
import Author from "../models/Author";
import Book, { BookValidationSchema } from "../models/Book";

export class BookController {

    public static async getBooks(req: Request, res: Response): Promise<void> {
        try {
            const books = await Book.find().populate('author');
            res.status(200).json(books)
        } catch (err) {
            res.status(500).json({
                status: "Failed",
                message: err
            })
        }
    }

    public static async getBook(req: Request, res: Response): Promise<void> {
        try {
            const book = await Book.findById(req.params.id).populate('author');
            res.status(200).json(book)
        } catch (err) {
            res.status(500).json({
                status: "Failed",
                message: err
            })
        }
    }

    public static async storeBook(req: Request, res: Response): Promise<void> {
        try {
            const validatedPayload = BookValidationSchema.validate(req.body);
            const book = new Book(validatedPayload.value);
            book.save();

            const author = await Author.findById(book.author);
            author.books.push(book._id);
            author.save();

            res.status(201).json(book);
        } catch (err) {
            res.status(500).json({
                status: 'Failed',
                message: err
            })
        }
    }

    public static async updateBook(req: Request, res: Response): Promise<void> {
        try {
            const validatedPayload = BookValidationSchema.validate(req.body);
            const book = await Book.findByIdAndUpdate(req.params.id, validatedPayload.value, {
                new: true,
                runValidators: true
            });
            res.status(200).json(book)
        } catch (err) {
            res.status(500).json({
                status: "Failed",
                message: err
            })
        }
    }

    public static async deleteBook(req: Request, res: Response): Promise<void> {
        try {
            await Book.findByIdAndDelete(req.params.id);
            res.status(204).json("Success")
        } catch (err) {
            res.status(500).json({
                status: "Failed",
                message: err
            })
        }
    }
}