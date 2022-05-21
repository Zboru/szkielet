import { useEffect, useState } from "react";
import AddAuthorButton from "../../Components/Authors/AddAuthorButton";
import AuthorsDataGrid from "../../Components/Authors/AuthorsDataGrid";
import { Author } from "../../Types/Models";
import { httpManager } from "../../Utils/httpManager";

export default function Authors() {

    const [authors, setAuthors] = useState<Author[]>([]);

    useEffect(() => {
        httpManager.get("/api/authors").then(response => {
            setAuthors(response.data);
        })
    }, [])

    return (
        <div>
            <h1>Autorzy</h1>
            <AddAuthorButton />
            <AuthorsDataGrid authors={authors}/>
            <AddAuthorButton />
        </div>
    )
}