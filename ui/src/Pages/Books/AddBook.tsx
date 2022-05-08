import { Save } from "@mui/icons-material";
import { Alert, Button, MenuItem, Select, SelectChangeEvent, Snackbar, Stack, TextField } from "@mui/material";
import { useState } from "react";

export default function AddBook() {

    const [name, setName] = useState("");
    const [pageCount, setPageCount] = useState("");
    const [author, setAuthor] = useState("");
    const [snackbarOpen, setOpen] = useState(false);

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleChangePageCount = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageCount(event.target.value);
    };

    const handleChangeAuthor = (event: SelectChangeEvent) => {
        setAuthor(event.target.value);
    };

    function handleClick() {
        setOpen(true);
        console.log("save");
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <h2>Dodaj książkę</h2>
            <Stack>
                <TextField value={name} onChange={handleChangeName} placeholder="Nazwa książki" />
                <TextField value={pageCount} onChange={handleChangePageCount} placeholder="Liczba stron" />
                <Select value={author} onChange={handleChangeAuthor} placeholder="Wydawca">
                    <MenuItem value={10}>Ten</MenuItem>
                </Select>
            </Stack>
            <Button sx={{ mt: 2 }}
                onClick={handleClick}
                variant="contained"
                endIcon={<Save />}
            >
                Zapisz książkę
            </Button>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Dodano książkę!
                </Alert>
            </Snackbar>
        </div>
    )
}