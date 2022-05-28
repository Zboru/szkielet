import mongoose from "mongoose";
import Joi from "joi";
export const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pageCount: {
        type: Number,
        required: false,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Author"
    }
})

export const BookValidationSchema = Joi.object().keys({
    name: Joi.string().alphanum().min(1).max(45).required(),
    pageCount: Joi.number().min(1).max(2000).required(),
    author: Joi.string().required()
})

const Book = mongoose.model('Book', BookSchema);
export default Book;