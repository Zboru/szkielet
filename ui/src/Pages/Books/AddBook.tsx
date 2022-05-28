import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookDetailsForm from "../../Components/Books/BookDetailsForm";
import { httpManager } from "../../Utils/httpManager";

export default function AddBook() {
    const [snackbarOpen, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    function handleSubmit(payload: { name: string, pageCount: number, author: string, _id?: string }) {
        delete payload._id;
        httpManager.post("/api/books", payload).then(response => {
            setOpen(true);
            setTimeout(()=>{navigate(-1);}, 2500)
        })
    }

    return (
        <div>
            <h2>Dodaj książkę</h2>
            <BookDetailsForm onSubmit={handleSubmit} />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Dodano książkę!
                </Alert>
            </Snackbar>
        </div>
    )
}