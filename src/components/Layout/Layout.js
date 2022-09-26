import CssBaseline from "@mui/material/CssBaseline";
import HeaderBar from "../HeaderBar/HeaderBar";
import SideBar from "../SideBar/SideBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import {
    Outlet,
} from "react-router-dom";
import {Alert} from "@mui/material";

function Layout(props) {
    return (
        <div>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <HeaderBar/>
                <SideBar/>

                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <Toolbar/>
                    {/*<Alert severity="error">*/}
                    {/*    This is an error alert — <strong>check it out!</strong>*/}
                    {/*</Alert>*/}
                    <Outlet/>
                </Box>
            </Box>
        </div>
    )
}

export default Layout;