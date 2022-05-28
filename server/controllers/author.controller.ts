import { Request, Response } from "express";
import { Model } from "mongoose";
import Author, { AuthorValidationSchema } from "../models/Author";

export class AuthorController {

    public static async getAuthors(req: Request, res: Response): Promise<void> {
        try {
            const authors = await Author.find({}).populate('books');
            res.status(200).json(authors)
        } catch (err) {
            res.status(500).json({
                status: "Failed",
                message: err
            })
        }
    }

    public static async getAuthor(req: Request, res: Response): Promise<void> {
        try {
            const author = await Author.findById(req.params.id).populate('books');
            res.status(200).json(author)
        } catch (err) {
            res.status(500).json({
                status: "Failed",
                message: err
            })
        }
    }

    public static async storeAuthor(req: Request, res: Response): Promise<void> {
        try {
            const validatedPayload = AuthorValidationSchema.validate(req.body);
            const author = new Author(validatedPayload.value);
            author.save();
            res.status(201).json(author)
        } catch (err) {
            res.status(500).json({
                status: 'Failed',
                message: err
            })
        }
    }

    public static async updateAuthor(req: Request, res: Response): Promise<void> {
        try {
            const validatedPayload = AuthorValidationSchema.validate(req.body);
            const author = await Author.findByIdAndUpdate(req.params.id, validatedPayload.value, {
                new: true,
                runValidators: true
            });
            res.status(200).json(author)
        } catch (err) {
            res.status(500).json({
                status: "Failed",
                message: err
            })
        }
    }

    public static async deleteAuthor(req: Request, res: Response): Promise<void> {
        try {
            await Author.findByIdAndDelete(req.params.id);
            res.status(204).json({
                status: "Success",
                data: {}
            })
        } catch (err) {
            res.status(500).json({
                status: "Failed",
                message: err
            })
        }
    }
}