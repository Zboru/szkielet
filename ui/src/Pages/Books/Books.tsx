import AddBookButton from "../../Components/Books/AddBookButton";
import BooksDataGrid from "../../Components/Books/BooksDataGrid";

export default function Books() {
    return (
        <div>
            <h1>Książki</h1>
            <AddBookButton />
            <BooksDataGrid />
            <AddBookButton />
        </div>
    )
}