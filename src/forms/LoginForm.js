import {login} from "../apis/auth";
import {toast} from "react-toastify";
import {Formik} from "formik";
import {Button, TextField} from "@mui/material";
import {useAuth} from "../pages/login/AuthProvider";


const initialValue = {
    email: '',
    password: '',
}

const formValidation = (values) => {
    const errors = {};
    return errors;
}

const LoginForm = (props) => {

    const {afterLogin} = useAuth();

    const submitHandler = (values, {setSubmitting}) => {
        login(values.email, values.password).then((res) => {
            afterLogin(res.data.data.access_token);
        }).catch((error) => {
            if (!error.response.data.message) {
                toast.error('Login Failed');
            } else {
                toast.error(error.response.data.message);
            }
        }).finally(() => {
            setSubmitting(false);
        })
    }


    return (
        <Formik
            initialValues={initialValue}
            validate={formValidation}
            onSubmit={submitHandler}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit
            }) => (
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        value={values.email}
                        onChange={handleChange}
                        error={touched.email && errors.email}
                        margin="normal"
                        autoComplete="email"
                        fullWidth
                        autoFocus
                    />
                    <TextField
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        error={touched.password && errors.password}
                        margin="normal"
                        autoComplete="current-password"
                        fullWidth
                    />
                    <Button color="primary" variant="contained" type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
                        Login
                    </Button>
                </form>
            )}
        </Formik>
    )
}

export default LoginForm;