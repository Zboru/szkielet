import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Author } from "../../Types/Models";
import DeleteAuthorDialog from "./DeleteAuthorDialog";
import ShowAuthorLink from "./ShowAuthorLink";

interface IProps { 
    authors: Author[]
}

export default function AuthorsDataGrid(props: IProps) {
    const [authors, setAuthors] = useState<Author[]>([]);
    const navigate = useNavigate();

    useEffect(()=>{
        setAuthors(props.authors);
    },[props.authors]);


    const onDelete = (author: Author) => {
        setAuthors(authors.filter(b => b._id !== author._id));
    }

    const editAuthor = (author: Author) => {
        navigate(`/authors/${author._id}/edit`);
    }

    const renderButtons = (params: {row: Author}) => {
        return (
            <div style={{display: 'flex'}}>
                <ShowAuthorLink author={params.row}/>
                <IconButton onClick={() => editAuthor(params.row)}>
                    <Edit />
                </IconButton>
                <DeleteAuthorDialog onDelete={onDelete} author={params.row}/>
            </div>
        )
    }

    const rows: GridRowsProp = authors.map((author, index) => {
        return {id: index, _id: author._id, firstname: author.firstName, lastname: author.lastName, dateofbirth: author.dateOfBirth};
    });

    const columns: GridColDef[] = [
        { field: '_id', headerName: 'ID' },
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