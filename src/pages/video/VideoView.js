import {Outlet, useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import {Card, CardHeader, Container, Grid, ListItem, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import {useEffect, useState} from "react";
import {getVideoById} from "../../apis/video";
import {videoModel} from "../../models/model";

function VideoView() {

    let params = useParams();

    const [video, setVideo] = useState(videoModel);

    useEffect(() => {
        const id = params.videoId;

        getVideoById(id).then((res) => {
            setVideo(res.data.data);
        }).catch((error) => {
            console.log(error);
        })
    },[params]);

    if (video) {
        return (
            <>
                <Container maxWidth="md">
                    <Box style={{marginBottom: 25}}>
                        <Typography variant="h3">DEV-103 #{video.id}</Typography>
                    </Box>
                    {/*<Paper variant="outlined">*/}
                        <Card style={{marginBottom: 25}}>
                            <CardHeader title="Basic info" />
                            <Divider />
                            <List>
                                <ListItem>
                                    <Grid container>
                                        <Grid xs={3} item>
                                            <Typography>ID</Typography>
                                        </Grid>
                                        <Grid xs={9} item>
                                            <Typography>{video.id}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Grid container>
                                        <Grid xs={3} item>
                                            <Typography>Title</Typography>
                                        </Grid>
                                        <Grid xs={9} item>
                                            <Typography>{video.title}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Grid container>
                                        <Grid xs={3} item>
                                            <Typography>Platform </Typography>
                                        </Grid>
                                        <Grid xs={9} item>
                                            <Typography>TikTok</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Grid container>
                                        <Grid xs={3} item>
                                            <Typography>Content Creator</Typography>
                                        </Grid>
                                        <Grid xs={9} item>
                                            <Typography>{video.content_creator_id}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Grid container>
                                        <Grid xs={3} item>
                                            <Typography>Source</Typography>
                                        </Grid>
                                        <Grid xs={9} item>
                                            <Typography sx={{wordWrap: 'break-word'}}>{video.source_url}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Grid container>
                                        <Grid xs={3} item>
                                            <Typography>Size</Typography>
                                        </Grid>
                                        <Grid xs={9} item>
                                            <Typography flexWrap>{video.height} x {video.width}</Typography>
                                            <Typography flexWrap>100 MB</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Grid container>
                                        <Grid xs={3} item>
                                            <Typography>Duration</Typography>
                                        </Grid>
                                        <Grid xs={9} item>
                                            <Typography flexWrap>25 seconds</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Grid container>
                                        <Grid xs={3} item>
                                            <Typography>Cover Image</Typography>
                                        </Grid>
                                        <Grid xs={9} item>
                                            <img src={video.cover_image_url} />
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Grid container>
                                        <Grid xs={3} item>
                                            <Typography>Approval Status</Typography>
                                        </Grid>
                                        <Grid xs={9} item>
                                            <Typography flexWrap>Approved (2022-08-29 12:00 PM)</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            </List>
                        </Card>

                        <Card>
                            <CardHeader title="Content info" />
                            <Divider />
                            <ListItem>
                                <Grid container>
                                    <Grid xs={3} item>
                                        <Typography>Cover Image</Typography>
                                    </Grid>
                                    <Grid xs={9} item>
                                        <img src={video.cover_image_url} />
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <Grid container>
                                    <Grid xs={3} item>
                                        <Typography>Video</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        </Card>

                    {/*</Paper>*/}
                </Container>
            </>
        )
    } else {
        return <></>
    }

}

export default VideoView;