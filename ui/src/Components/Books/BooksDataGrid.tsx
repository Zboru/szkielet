import { Delete, Edit, ZoomIn } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Book } from "../../Types/Models";
import DeleteBookDialog from "./DeleteBookDialog";
import ShowBookLink from "./ShowBookLink";

interface IProps {
    books: Book[];
}

export default function BooksDataGrid(props: IProps) {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(()=>{
        setBooks(props.books);
    },[props.books]);

    const onDelete = (book: Book) => {
        setBooks(books.filter(b => b._id !== book._id));
    }

    const renderButtons = (params: {row: Book}) => {
        return (
            <div style={{display: 'flex'}}>
                {/* <IconButton>
                    <ZoomIn />
                </IconButton>
                <IconButton>
                    <Edit />
                </IconButton> */}
                <ShowBookLink book={params.row}/>
                <DeleteBookDialog onDelete={onDelete} book={params.row}/>
            </div>
        )
    }

    const rows: GridRowsProp = books.map((book, index) => {
        return {id: index, _id: book._id, name: book.name, author: `${book.author.firstName} ${book.author.lastName}`, pageCount: book.pageCount};
    });

    const columns: GridColDef[] = [
        { field: '_id', headerName: 'ID' },
        { field: 'name', headerName: 'Nazwa książki', flex: 1 },
        { field: 'author', headerName: 'Autor', width: 150 },
        { field: 'pageCount', headerName: 'Liczba stron', width: 150 },
        { field: 'actions', headerName: 'Akcje', width: 150, renderCell: renderButtons },
    ];


    return (
        <div style={{ height: 300, width: '100%' }}>
            <DataGrid disableColumnSelector={true} rows={rows} columns={columns} />
        </div>
    )
}