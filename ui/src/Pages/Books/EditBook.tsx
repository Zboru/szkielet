import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { Portal } from "react-portal";
import { useNavigate, useParams } from "react-router-dom";
import BookDetailsForm from "../../Components/Books/BookDetailsForm";
import { Book } from "../../Types/Models";
import { httpManager } from "../../Utils/httpManager";

export default function EditBook() {
    const [snackbarOpen, setOpen] = useState(false);
    const [book, setBook] = useState<Book | null>(null);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        httpManager.get(`/api/books/${id}`).then(response => {
            setBook(response.data);
        })
    }, [])

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    function handleSubmit(payload: { name: string, pageCount: number, author: string, _id: string }) {
        httpManager.put(`/api/books/${payload._id}`, payload).then(response => {
            setOpen(true);
            setTimeout(()=>{navigate(-1);}, 2500)
        })
    }

    return (
        <div>
            <h2>Edytuj autora</h2>
            <BookDetailsForm initialData={book} onSubmit={handleSubmit} />
            <Portal node={document && document.getElementById('toasts')}>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={2500}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Edytowano książkę!
                    </Alert>
                </Snackbar>
            </Portal>
        </div>
    )
}