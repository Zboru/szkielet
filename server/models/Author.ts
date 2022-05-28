import Joi from "joi";
import mongoose from "mongoose";
export const AuthorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    }]
})

export const AuthorValidationSchema = Joi.object().keys({
    firstName: Joi.string().alphanum().required(),
    lastName: Joi.string().alphanum().required(),
    dateOfBirth: Joi.string().pattern(new RegExp(/\d{2}-\d{2}-\d{4}/)).required(),
})

const Author = mongoose.model('Author', AuthorSchema);
export default Author;