import mongoose from "mongoose";
import Author, { AuthorSchema } from "./Author";
const BookSchema = new mongoose.Schema({
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
        ref: Author
    }
})

const Book = mongoose.model('Book', BookSchema);
export default Book;

//6289101a414d9257d0edff16