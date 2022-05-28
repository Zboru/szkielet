import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Author } from "../../Types/Models";
import { httpManager } from "../../Utils/httpManager";

function AuthorDetails(props: { author: Author }) {
    return (<ul>
        <li>Imię: {props.author.firstName}</li>
        <li>Nazwisko: {props.author.lastName}</li>
        <li>Data urodzenia: {props.author.dateOfBirth}</li>
        <li>Książki:
            <ol>
                {props.author.books?.map(book => {
                    return <li key={book._id}><Link to={`/books/${book._id}`}>{book.name}</Link></li>
                })}
            </ol>
        </li>
    </ul>)
}

export default function ShowAuthor() {
    const [author, setAuthor] = useState<Author | null>(null);
    let { id } = useParams();

    useEffect(() => {
        httpManager.get(`/api/authors/${id}`).then(response => {
            setAuthor(response.data);
        })
    }, [id]);

    return (
        <div>
            <h2>Szczegóły autora</h2>
            {author ? (<AuthorDetails author={author} />) : ""}
        </div>
    )
}