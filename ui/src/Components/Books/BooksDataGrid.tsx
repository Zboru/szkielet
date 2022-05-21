import { Delete, Edit, ZoomIn } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Book } from "../../Types/Models";

interface IProps {
    books: Book[]
}

export default function BooksDataGrid(props: IProps) {

    const renderButtons = () => {
        return (
            <div>
                <IconButton>
                    <ZoomIn />
                </IconButton>
                <IconButton>
                    <Edit />
                </IconButton>
                <IconButton>
                    <Delete />
                </IconButton>
            </div>
        )
    }

    const rows: GridRowsProp = props.books.map(book => {
        return {id: book._id, name: book.name, author: `${book.author.firstName} ${book.author.lastName}`, pageCount: book.pageCount};
    });

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID' },
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