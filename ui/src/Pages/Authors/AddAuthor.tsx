import { Save } from "@mui/icons-material";
import { Alert, Button, Snackbar, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";

export default function AddAuthor() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [snackbarOpen, setOpen] = useState(false);

    const handleChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    };

    const handleChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };

    function handleClick() {
        setOpen(true);
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
                <TextField value={firstName} onChange={handleChangeFirstName} placeholder="Imię" />
                <TextField value={lastName} onChange={handleChangeLastName} placeholder="Nazwisko" />
                <DatePicker
                    label="Data urodzenia"
                    value={dateOfBirth}
                    onChange={newValue => setDateOfBirth(newValue || "")}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Stack>
            <Button sx={{ mt: 2 }}
                onClick={handleClick}
                variant="contained"
                endIcon={<Save />}
            >
                Zapisz autora
            </Button>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2500}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Dodano autora!
                </Alert>
            </Snackbar>
        </div>
    )
}