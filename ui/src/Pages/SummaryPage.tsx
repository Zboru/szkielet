import { useEffect, useState } from "react"
import { Author } from "../Types/Models";
import { httpManager } from "../Utils/httpManager";

export default function SummaryPage() {
    const [authors, setAuthors] = useState<Author[]>([]);

    useEffect(()=>{
        httpManager.get("/api/authors").then(response => {
            setAuthors(response.data);
        });
    },[]);

    return (
        <div>
            <h2>Wszystkie książki</h2>
            <pre>{JSON.stringify(authors)}</pre>
        </div>
    )
}