import axios from "axios";
import { useEffect, useState } from "react";
import AddBookButton from "../../Components/Books/AddBookButton";
import BooksDataGrid, { Book } from "../../Components/Books/BooksDataGrid";

export default function Books() {

    const [books, setBooks] = useState<Book[]>([]);

    useEffect(()=>{
        axios.get('//localhost:3080/api/books').then(response => {
            setBooks(response.data);
        })
    }, [])

    return (
        <div>
            <span>{JSON.stringify(books)}</span>
            <h1>Książki</h1>
            <AddBookButton />
            <BooksDataGrid books={books} />
            <AddBookButton />
        </div>
    )
}