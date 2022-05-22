import mongoose from "mongoose";
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

const Book = mongoose.model('Book', BookSchema);
export default Book;