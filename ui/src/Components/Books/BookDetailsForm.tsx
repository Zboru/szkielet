import { Save } from "@mui/icons-material";
import { Button, FormHelperText, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useFormik } from "formik"
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { Author, Book } from "../../Types/Models";
import { httpManager } from "../../Utils/httpManager";

interface IProps {
    onSubmit?: Function,
    initialData?: Book,
    handleFormChange?: Function
}

export default function BookDetailsForm(props: IProps) {
    const [availableAuthors, setAvailableAuthors] = useState<Author[]>([]);

    const formik = useFormik({
        initialValues: {
            _id: "",
            name: "",
            pageCount: 0,
            author: "",
        },
        validationSchema: Yup.object({
            _id: Yup.string()
                .nullable(),
            name: Yup.string()
                .max(45, "Musi być krótsza niż 45 znaków")
                .required("Wymagane"),
            pageCount: Yup.number()
                .typeError("Musi być liczbą")
                .min(1, "Musi zawierać większą liczbę niż 1")
                .max(2000, "Musi zawierać mniejszą liczbę niż 2000")
                .required("Wymagane"),
            author: Yup.string()
                .typeError("Wymagane")
                .required("Wymagane")
        }),
        onSubmit: (payload) => {
            if (props.onSubmit) {
                props.onSubmit(payload);
            }
        },
    })

    useEffect(() => {
        httpManager.get("/api/authors").then(response => {
            setAvailableAuthors(response.data);
        })
    }, [])

    useEffect(() => {
        formik.setValues({
            _id: props.initialData?._id || "",
            name: props.initialData?.name || "",
            pageCount: props.initialData?.pageCount || 0,
            author: props.initialData?.author._id || ""
        });
    }, [props.initialData, availableAuthors]);

    useEffect(() => {
        if (props.handleFormChange) {
            props.handleFormChange(formik.values);
        }
    }, [formik.values])


    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack>
                <TextField value={formik.values.name} error={!!formik.errors.name} onBlur={formik.handleBlur} onChange={formik.handleChange} name="name" placeholder="Nazwa książki" />
                {formik.touched.name && formik.errors.name ? (
                    <FormHelperText style={{ color: "red" }}>{formik.errors.name}</FormHelperText>
                ) : null}
                <TextField value={formik.values.pageCount} error={!!formik.errors.pageCount} onBlur={formik.handleBlur} onChange={formik.handleChange} name="pageCount" placeholder="Liczba stron" />
                {formik.touched.pageCount && formik.errors.pageCount ? (
                    <FormHelperText style={{ color: "red" }}>{formik.errors.pageCount}</FormHelperText>
                ) : null}
                <Select value={formik.values.author} error={!!formik.errors.author} onBlur={formik.handleBlur} onChange={formik.handleChange} name="author" placeholder="Wydawca">
                    {availableAuthors.map(author => {
                        return <MenuItem key={author._id} value={author._id}>{author.firstName} {author.lastName}</MenuItem>
                    })}
                </Select>
                {formik.touched.author && formik.errors.author ? (
                    <FormHelperText style={{ color: "red" }}>{formik.errors.author}</FormHelperText>
                ) : null}
                {!props.initialData ? (
                    <Button sx={{ mt: 2, maxWidth: 'fit-content' }}
                        type="submit"
                        variant="contained"
                        endIcon={<Save />}
                    >
                        Zapisz książkę
                    </Button>
                ) : null}
            </Stack>
        </form>
    )
}