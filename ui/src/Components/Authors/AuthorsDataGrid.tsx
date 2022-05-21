import { Delete, Edit, ZoomIn } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Author } from "../../Types/Models";

interface IProps {
    authors: Author[]
}

export default function AuthorsDataGrid(props: IProps) {

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

    const rows: GridRowsProp = props.authors.map(author => {
        return {id: author._id, firstname: author.firstName, lastname: author.lastName, dateofbirth: author.dateOfBirth};
    });

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID' },
        { field: 'firstname', headerName: 'Imię', flex: 1 },
        { field: 'lastname', headerName: 'Nazwisko', width: 150 },
        { field: 'dateofbirth', headerName: 'Data urodzenia', width: 150 },
        { field: 'actions', headerName: 'Akcje', width: 150, renderCell: renderButtons },
    ];


    return (
        <div style={{ height: 300, width: '100%' }}>
            <DataGrid disableColumnSelector={true} rows={rows} columns={columns} />
        </div>
    )
}