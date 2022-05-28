import { Delete } from '@mui/icons-material';
import { Alert, IconButton, Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Author } from '../../Types/Models';
import { httpManager } from '../../Utils/httpManager';
import { Portal } from 'react-portal';

interface IProps {
    author: Author;
    onDelete?: Function;
}

export default function DeleteAuthorDialog(props: IProps) {
    const [open, setOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAlertClose = () => {
        setSnackbarOpen(false);
    };

    const onDelete = () => {
        if (props.onDelete) {
            props.onDelete(props.author);
        }
    }

    const deleteAuthor = () => {
        httpManager.delete(`/api/authors/${props.author._id}`).then(() => {
            setSnackbarOpen(true);
            setOpen(false);
            onDelete();
        })
    }

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <Delete />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Usuń autora
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Czy na pewno chcesz usunąć autora? Ta operacja jest nieodwracalna i powoduje utratę danych danego autora.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Anuluj</Button>
                    <Button variant='contained' color="error" onClick={deleteAuthor} autoFocus>
                        Usuń
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
                        Usunięto autora!
                    </Alert>
                </Snackbar>
            </Portal>
        </div>
    );
}