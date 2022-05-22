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
const Author = mongoose.model('Author', AuthorSchema);
export default Author;