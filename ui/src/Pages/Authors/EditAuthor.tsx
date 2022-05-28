import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { Portal } from "react-portal";
import { useNavigate, useParams } from "react-router-dom";
import AuthorsDetailsForm from "../../Components/Authors/AuthorDetailsForm";
import { Author } from "../../Types/Models";
import { httpManager } from "../../Utils/httpManager";

export default function EditAuthor() {
    const [snackbarOpen, setOpen] = useState(false);
    const [author, setAuthor] = useState<Author | null>(null);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        httpManager.get(`/api/authors/${id}`).then(response => {
            setAuthor(response.data);
        })
    }, [])

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    function handleSubmit(payload: { firstName: string, lastName: string, dateOfBirth: string, _id: string }) {
        httpManager.put(`/api/authors/${payload._id}`, payload).then(response => {
            setOpen(true);
            setTimeout(()=>{navigate(-1);}, 2500)
        })
    }

    return (
        <div>
            <h2>Edytuj autora</h2>
            <AuthorsDetailsForm initialData={author} onSubmit={handleSubmit} />
            <Portal node={document && document.getElementById('toasts')}>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={2500}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Edytowano autora!
                    </Alert>
                </Snackbar>
            </Portal>
        </div>
    )
}