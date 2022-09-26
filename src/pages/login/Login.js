import {Card, Container, Paper} from "@mui/material";
import LoginForm from "../../forms/LoginForm";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Navigate} from "react-router-dom";

const Login = (props) => {

    const sessionToken = sessionStorage.getItem('access_token');

    if (sessionToken) {
        return <Navigate to="/overview" replace />;
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} >
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingX: 5,
                    paddingY: 3
                }}>
                    <Typography variant="h2">VCP</Typography>
                    <LoginForm />
                </Box>
            </Paper>
        </Container>
    )
}

export default Login;