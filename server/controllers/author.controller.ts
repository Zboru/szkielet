import { Request, Response } from "express";
import { Model } from "mongoose";
import Author from "../models/Author";

export class AuthorController {

    public static async getAuthors(req: Request, res: Response): Promise<void> {
        const authors = await Author.find({});
        try {
            res.status(200).json({
                status: "Success",
                data: { authors }
            })
        } catch (err) {
            res.status(500).json({
                status: "Failed",
                message: err
            })
        }
    }

    public static async getAuthor(req: Request, res: Response): Promise<void> {
        try {
            const author = await Author.findById(req.params.id);
            res.status(200).json({
                status: "Success",
                data: { author }
            })
        } catch (err) {
            res.status(500).json({
                status: "Failed",
                message: err
            })
        }
    }

    public static async storeAuthor(req: Request, res: Response): Promise<void> {
        const author = new Author(req.body);

        try {
            author.save();
            res.status(201).json({
                status: 'Success',
                data: { author }
            })
        } catch (err) {
            res.status(500).json({
                status: 'Failed',
                message: err
            })
        }
    }

    public static async updateAuthor(req: Request, res: Response): Promise<void> {
        try {
            const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            res.status(200).json({
                status: "Success",
                data: { author }
            })
        } catch (err) {
            res.status(500).json({
                status: "Failed",
                message: err
            })
        }
    }

    public static async deleteAuthor(req: Request, res: Response): Promise<void> {
        try {
            const author = await Author.findByIdAndDelete(req.params.id);
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