import { Button, Card, CardActions, CardContent, TextField, Alert, Snackbar, CardHeader } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { httpManager } from "../../Utils/httpManager";
export default function LogInForm(props: {handleRegisterClick?: Function}) {
    const [snackbarOpen, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleLogin = (payload: { email: string, password: string }) => {
        httpManager.post('/api/auth', payload).then(response => {
            localStorage.setItem('token', response.data);
            navigate("/");
        }).catch(err => {
            setOpen(true);
        })
    }

    const handleRegisterClick = () => {
        if (props.handleRegisterClick) {
            props.handleRegisterClick();
        }
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Wymagany poprawny adres e-mail")
                .required("Wymagane"),
            password: Yup.string()
                .required("Wymagane")
        }),
        onSubmit: (payload) => {
            handleLogin(payload);
        },
    })

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
        }}>
            <Card sx={{ maxWidth: 420, minWidth: 420 }}>
            <CardHeader title="Zaloguj się" sx={{paddingBottom: 0}}/>
                <form onSubmit={formik.handleSubmit}>
                    <CardContent sx={{ padding: '1.5rem' }}>
                        <TextField sx={{ width: '100%' }}
                            label="Adres e-mail"
                            placeholder="jan@kowalski.net"
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.email && formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
                        />
                        <TextField sx={{ marginTop: '1rem', width: '100%' }}
                            label="Hasło"
                            placeholder="kowalski1"
                            type="password"
                            name="password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.password && formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password ? formik.errors.password : null}
                        />
                    </CardContent>
                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={handleRegisterClick}>Zarejestruj się</Button>
                        <Button
                            type="submit"
                            disabled={!!Object.keys(formik.errors).length}
                        >
                            Zaloguj się
                        </Button>
                    </CardActions>
                </form>
            </Card>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2500}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Błędny e-mail lub hasło!
                </Alert>
            </Snackbar>
        </div>
    )
}