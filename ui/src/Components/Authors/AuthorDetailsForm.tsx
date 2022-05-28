import { Save } from "@mui/icons-material";
import { Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik"
import InputMask from "react-input-mask";
import { useEffect } from "react";
import * as Yup from 'yup';
import { Author } from "../../Types/Models";

interface IProps {
    onSubmit?: Function,
    initialData?: Author | null,
    handleFormChange?: Function
}

export default function AuthorsDetailsForm(props: IProps) {
    const formik = useFormik({
        initialValues: {
            _id: "",
            firstName: "",
            lastName: "",
            dateOfBirth: "",
        },
        validationSchema: Yup.object({
            _id: Yup.string()
                .nullable(),
            firstName: Yup.string()
                .required("Wymagane"),
            lastName: Yup.string()
                .required("Wymagane"),
            dateOfBirth: Yup.string()
                .required("Wymagane")
                .length(10, "Wprowadź poprawną datę")
        }),
        onSubmit: (payload) => {
            if (props.onSubmit) {
                props.onSubmit(payload);
            }
        },
    })

    useEffect(() => {
        formik.setValues({
            _id: props.initialData?._id || "",
            firstName: props.initialData?.firstName || "",
            lastName: props.initialData?.lastName || "",
            dateOfBirth: props.initialData?.dateOfBirth || "",
        });
    }, [props.initialData]);

    useEffect(() => {
        if (props.handleFormChange) {
            props.handleFormChange(formik.values);
        }
    }, [formik.values])


    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack>
                <TextField
                    value={formik.values.firstName}
                    error={!!(formik.touched.firstName && formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : null}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="firstName"
                    label="Imię autora"
                    placeholder="Imię autora" />
                <TextField
                    value={formik.values.lastName}
                    error={!!(formik.touched.lastName && formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : null}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    sx={{ marginTop: '1rem' }}
                    name="lastName"
                    label="Nazwisko autora"
                    placeholder="Nazwisko autora" />
                <InputMask
                    mask="99-99-9999"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.dateOfBirth}
                    maskPlaceholder={""}
                >
                    <TextField
                        error={!!(formik.touched.dateOfBirth && formik.errors.dateOfBirth)}
                        helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth ? formik.errors.dateOfBirth : null}
                        sx={{ marginTop: '1rem' }}
                        name="dateOfBirth"
                        label="Data urodzenia autora"
                        placeholder="Data urodzenia autora" />
                </InputMask>
                <Button sx={{ mt: 2, maxWidth: 'fit-content' }}
                    type="submit"
                    variant="contained"
                    endIcon={<Save />}
                    disabled={!!Object.keys(formik.errors).length}
                >
                    Zapisz autora
                </Button>
            </Stack>
        </form>
    )
}