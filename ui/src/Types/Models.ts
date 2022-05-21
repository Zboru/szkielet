export interface Book {
    _id: String,
    name: String,
    pageCount: Number,
    author: Author
}

export interface Author {
    _id: String,
    firstName: String,
    lastName: String,
    dateOfBirth: String
}