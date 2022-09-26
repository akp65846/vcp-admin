import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import * as React from "react";
import {Button} from "@mui/material";
import {useAuth} from "../../pages/login/AuthProvider";

function HeaderBar(props) {

    const {handleLogout} = useAuth();

    return (
        <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    VCP
                </Typography>
                <Typography sx={{marginLeft: 1, flexGrow: 1}}> Beta</Typography>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Toolbar>
        </AppBar>
    )
}

export default HeaderBar;