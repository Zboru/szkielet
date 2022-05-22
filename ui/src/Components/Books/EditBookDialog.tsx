import { Alert, IconButton, Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { httpManager } from '../../Utils/httpManager';
import { Portal } from 'react-portal';
import { Edit } from '@mui/icons-material';
import { Book } from '../../Types/Models';
import BookDetailsForm from './BookDetailsForm';

interface IProps {
    book: Book;
    onDelete?: Function;
}

export default function EditBookDialog(props: IProps) {
    const [open, setOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [book, setBook] = useState<Book|null>(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAlertClose = () => {
        setSnackbarOpen(false);
    };

    const updateBook = () => {
        const payload = {};
        httpManager.put(`/api/books/${book?._id}`, payload).then(() => {
            setSnackbarOpen(true);
            setOpen(false);
        })
    }

    const handleSubmit = (payload: Book) => {
        setBook(payload);
    }

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <Edit />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Edytuj książkę
                </DialogTitle>
                <DialogContent>
                    <BookDetailsForm initialData={props.book} handleFormChange={handleSubmit} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Anuluj</Button>
                    <Button variant='contained' onClick={updateBook} autoFocus>
                        Edytuj
                    </Button>
                </DialogActions>
            </Dialog>
            <Portal node={document && document.getElementById('toasts')}>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3500}
                    onClose={handleAlertClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
                        Edytowano książkę!
                    </Alert>
                </Snackbar>
            </Portal>
        </div>
    )
}