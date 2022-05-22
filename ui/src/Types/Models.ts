export interface Book {
    _id: string,
    name: string,
    pageCount: number,
    author: Author
}

export interface Author {
    _id: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    books?: Book[]
}