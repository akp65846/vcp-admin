import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import * as React from "react";
import {Link, useNavigate} from "react-router-dom";
import {ListSubheader} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import InsightsIcon from '@mui/icons-material/Insights';
import AddTaskIcon from '@mui/icons-material/AddTask';
import PublishIcon from '@mui/icons-material/Publish';
import LanguageIcon from '@mui/icons-material/Language';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import AssignmentIcon from '@mui/icons-material/Assignment';

const drawerWidth = 240;

function SideBar(props) {
    let navigate = useNavigate();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
            }}
        >
            <Toolbar/>
            <Box sx={{overflow: 'auto'}}>
                <List subheader={<ListSubheader>Dashboards</ListSubheader>}>
                    <ListItem key="overview" disablePadding>
                        <ListItemButton onClick={() => {navigate('/overview')}}>
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <ListItemText>
                                Overview
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key="daily-summary" disablePadding>
                        <ListItemButton onClick={() => {navigate('/')}}>
                            <ListItemIcon>
                                <InsightsIcon/>
                            </ListItemIcon>
                            <ListItemText>Daily Summary</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider/>


                <List subheader={<ListSubheader>Actions</ListSubheader>}>
                    <ListItem key="video-approval" disablePadding>
                        <ListItemButton onClick={() => {navigate('/video-approval')}}>
                            <ListItemIcon>
                                <AddTaskIcon/>
                            </ListItemIcon>
                            <ListItemText>
                                Video Approval
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key="publish-a-video" disablePadding>
                        <ListItemButton onClick={() => {navigate('/video-publishment')}}>
                            <ListItemIcon>
                                <PublishIcon/>
                            </ListItemIcon>
                            <ListItemText>Publish a Video</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider/>


                <List subheader={<ListSubheader>Listings</ListSubheader>}>
                    <ListItem key="platform" disablePadding>
                        <ListItemButton onClick={() => {navigate('/platform')}}>
                            <ListItemIcon>
                                <LanguageIcon/>
                            </ListItemIcon>
                            <ListItemText>
                                Platform
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key="content-creator" disablePadding>
                        <ListItemButton onClick={() => {navigate('/content-creator')}}>
                            <ListItemIcon>
                                <VideoCameraFrontIcon/>
                            </ListItemIcon>
                            <ListItemText>Content Creator</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key="video" disablePadding>
                        <ListItemButton onClick={() => {navigate('/video')}}>
                            <ListItemIcon>
                                <OndemandVideoIcon/>
                            </ListItemIcon>
                            <ListItemText>Video</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key="media" disablePadding>
                        <ListItemButton onClick={() => {navigate('/media')}}>
                            <ListItemIcon>
                                <PermMediaIcon/>
                            </ListItemIcon>
                            <ListItemText>Media</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key="publishment" disablePadding>
                        <ListItemButton onClick={() => {navigate('/publishment')}}>
                            <ListItemIcon>
                                <DriveFolderUploadIcon/>
                            </ListItemIcon>
                            <ListItemText>Publishment</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider/>
                <List subheader={<ListSubheader>Admin</ListSubheader>}>
                    <ListItem key="task-log" disablePadding>
                        <ListItemButton onClick={() => {navigate('/task-log')}}>
                            <ListItemIcon>
                                <AssignmentIcon/>
                            </ListItemIcon>
                            <ListItemText>
                                Task Log
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}

export default SideBar;