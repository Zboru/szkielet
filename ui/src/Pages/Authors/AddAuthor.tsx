import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import { Portal } from "react-portal";
import { useNavigate } from "react-router-dom";
import AuthorsDetailsForm from "../../Components/Authors/AuthorDetailsForm";
import { httpManager } from "../../Utils/httpManager";

export default function AddAuthor() {
    const [snackbarOpen, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    function handleSubmit(payload: { firstName: string, lastName: string, dateOfBirth: string, _id?: string }) {
        delete payload._id;
        httpManager.post("/api/authors", payload).then(response => {
            setOpen(true);
            setTimeout(()=>{navigate(-1);}, 2500)
        })
    }

    return (
        <div>
            <h2>Dodaj autora</h2>
            <AuthorsDetailsForm onSubmit={handleSubmit} />
            <Portal node={document && document.getElementById('toasts')}>
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
            </Portal>
        </div>
    )
}