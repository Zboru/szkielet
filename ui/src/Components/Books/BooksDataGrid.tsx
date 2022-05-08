import { Delete, Edit, ZoomIn } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

export default function BooksDataGrid() {

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

    const rows: GridRowsProp = [
        { id: 1, name: "Stary człowiek i morze 1", author: "Ernest Hemingway", publisher: "Super wydawca" },
        { id: 2, name: "Stary człowiek i morze 2", author: "Ernest Hemingway", publisher: "Super wydawca" },
        { id: 3, name: "Stary człowiek i morze 3", author: "Ernest Hemingway", publisher: "Super wydawca" },
    ];

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Nazwa książki', flex: 1 },
        { field: 'author', headerName: 'Autor', width: 150 },
        { field: 'publisher', headerName: 'Wydawca', width: 150 },
        { field: 'actions', headerName: 'Akcje', width: 150, renderCell: renderButtons },
    ];


    return (
        <div style={{ height: 300, width: '100%' }}>
            <DataGrid disableColumnSelector={true} rows={rows} columns={columns} />
        </div>
    )
}