import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavigationBar() {

    const Bar = styled('div')`
        width: 100%;
        // height: 35px;
        background: rgba(0,0,0,.1);
    `
    return (
        <Bar>
            <Button variant="text">
                <Link to="/books">Książki</Link>
            </Button>
            <Button variant="text">
                <Link to="/authors">Autorzy</Link>
            </Button>
        </Bar>
    )
}