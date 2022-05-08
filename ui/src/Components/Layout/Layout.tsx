import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";

export default function Layout() {
    return (
        <main>
            <NavigationBar />
            <Container>
                <Outlet />
            </Container>
        </main>
    )
}