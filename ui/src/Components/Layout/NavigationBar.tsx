import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function NavigationBar() {
    const navigate = useNavigate();

    const Bar = styled('div')`
        width: 100%;
        background: rgba(0,0,0,.1);
        display: flex;
    `

    const Spacer = styled('div')`
        flex: 1;
    `

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/auth');
    }

    return (
        <Bar>
            <Link to="/books">
                <Button variant="text">
                    Książki
                </Button>
            </Link>
            <Link to="/authors">
                <Button variant="text">
                    Autorzy
                </Button>
            </Link>
            <Link to="/summary">
                <Button variant="text">
                    Lista główna
                </Button>
            </Link>
            <Spacer />
            <Button onClick={handleLogout} variant="text">
                Wyloguj się
            </Button>
        </Bar>
    )
}