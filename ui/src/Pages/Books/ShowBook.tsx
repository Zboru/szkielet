import { useEffect, useState } from "react"
import { useParams } from "react-router";
import { Book } from "../../Types/Models";
import { httpManager } from "../../Utils/httpManager";

function BookDetails(props: { book: Book }) {
    return (<ul>
        <li>Nazwa książki: {props.book.name}</li>
        <li>Liczba stron: {props.book.pageCount}</li>
        <li>Autor: <ul>
            <li>Imię: {props.book.author.firstName}</li>
            <li>Nazwisko: {props.book.author.lastName}</li>
            <li>Data urodzenia: {props.book.author.dateOfBirth}</li>
        </ul>
        </li>
    </ul>);
}

export default function ShowBook() {
    const [book, setBook] = useState<Book | null>(null);
    let { id } = useParams();

    useEffect(() => {
        httpManager.get(`/api/books/${id}`).then(response => {
            setBook(response.data);
        })
    }, [id]);

    return (
        <div>
            <h2>Szczegóły książki</h2>
            {book ? (<BookDetails book={book} />) : ""}
        </div>
    )
}