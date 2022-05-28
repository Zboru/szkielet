import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Author } from "../Types/Models";
import { httpManager } from "../Utils/httpManager";

export default function SummaryPage() {
    const [authors, setAuthors] = useState<Author[]>([]);

    useEffect(()=>{
        httpManager.get("/api/authors").then(response => {
            setAuthors(response.data);
        });
    },[]);

    const AuthorList = () => {
        return (
            <ol>
                {authors.map(author => {
                    return <li key={author._id}>
                        <Link to={`/authors/${author._id}`}>{author.firstName} {author.lastName}</Link>
                        <ol>
                            {author.books?.map(book => {
                                return <li key={book._id}><Link to={`/books/${book._id}`}>{book.name}</Link></li>
                            })}
                        </ol>
                    </li>
                })}
            </ol>
        )
    }

    return (
        <div>
            <h2>Wszystkie książki</h2>
            <AuthorList/>
        </div>
    )
}