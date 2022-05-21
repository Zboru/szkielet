import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function AddAuthorButton() {
    return (
        <Button sx={{ my: 2 }}
            variant="contained"
            component={Link}
            to="/authors/add"
            endIcon={<Add />}
        >
            Dodaj autora
        </Button>
    )
}