import { useEffect, useState } from "react";
import AddBookButton from "../../Components/Books/AddBookButton";
import BooksDataGrid from "../../Components/Books/BooksDataGrid";
import { Book } from "../../Types/Models";
import { httpManager } from "../../Utils/httpManager";

export default function Books() {

    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        httpManager.get("/api/books").then(response => {
            setBooks(response.data);
        })
    }, [])

    return (
        <div>
            <h1>Książki</h1>
            <AddBookButton />
            <BooksDataGrid books={books} />
            <AddBookButton />
        </div>
    )
}