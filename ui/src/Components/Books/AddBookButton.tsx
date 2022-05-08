import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function AddBookButton() {
    return (
        <Button sx={{ my: 2 }}
            variant="contained"
            component={Link}
            to="/books/add"
            endIcon={<Add />}
        >
            Dodaj książkę
        </Button>
    )
}