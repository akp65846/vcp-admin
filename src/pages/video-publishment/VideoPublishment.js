import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Chip, Dialog, DialogActions, DialogContent, DialogTitle,
    Grid,
    IconButton
} from "@mui/material";
import Box from "@mui/material/Box";
import {useEffect, useState, useRef} from "react";
import {getAllApprovedVideos, getAllVideo} from "../../apis/video";
import {getAllContentCreator} from "../../apis/content-creator";
import Typography from "@mui/material/Typography";
import PublishmentForm from "../../forms/PublishmentForm";
import {getDate} from "../../utils/date";
import VideoCard from "../../components/VideoCard/VideoCard";


function getTagElements(video) {
    let elements = [];
    if(video.publishment_count == 0) {
        elements.push(<Chip label="Never Published" size={"small"} color={"primary"} key={1} sx={{marginRight: 0.5}} />)
    }
    if(video.duration < 60) {
        elements.push(<Chip label="Youtube Short" size={"small"} color={"secondary"} key={2} sx={{marginRight: 0.5}} />)
    }

    return elements;
}

const VideoPublishment = (props) => {

    const formRef = useRef();
    const [videos, setVideos] = useState([]);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState({});

    useEffect(() => {

        Promise.all([getAllVideo({approval_status: 2, order_by: 'approval_time', order: 'desc'}), getAllContentCreator()]).then((res) => {
            let videos = res[0].data.data;
            let creators = res[1].data.data;

            videos.forEach((video) => {
                creators.forEach((creator) => {
                    if (creator.id === video.content_creator_id) {
                        video.content_creator_name = creator.name;
                        video.content_creator_profile_icon_url = creator.profile_icon_url;
                    }
                })
            })
            setVideos(videos);

        }).catch((error) => {
            console.log(error);
        })

    },[]);

    const closeDialog = () => {
        setIsOpenDialog(false);
    }

    const handleDialogSubmit = () => {
        if (formRef.current) {
            formRef.current.handleSubmit();
        }
    }

    const handleSuccessPublish = () => {
        closeDialog();
    }

    function openDialog(video){
        setSelectedVideo(video);
        setIsOpenDialog(true);
    }

    function getVideoCard(video) {
        let date = new Date(video.created_time);
        let formattedDate = date.toLocaleDateString();
        let approvedDate = getDate(video.approval_time);
        let tagElements = getTagElements(video);
        let mediaStatus = video.media_id ? 'Downloaded' : 'Pending';

        let cardDetails = (
            <>
                <Typography>
                    Approved date: {approvedDate}
                    <br/>
                    Media status: {mediaStatus}
                    <br/>
                    Duration: {video.duration}s
                    <br/>
                    Remarks: {video.remarks}
                </Typography>
            </>
        )

        let cardActions = (
            <>
                <Button onClick={() => {openDialog(video)}}>Publish</Button>
            </>
        )

        return (
            <Grid item xs={12} md={6} lg={4} xl={3} key={video.id}>
                <Box style={{height: '100%'}}>
                    <VideoCard
                        creatorIcon={video.content_creator_profile_icon_url}
                        creatorName={video.content_creator_name}
                        createdDate={formattedDate}
                        videoCoverImg={video.cover_image_url}
                        videoSourceUrl={video.source_url}
                        mainTitle={video.title}
                        details={cardDetails}
                        tagElements={tagElements}
                        actions={cardActions}
                    />
                </Box>
            </Grid>
        )
    }

    return (
        <Grid container spacing={3}>
            {videos.map((video) => {
                return getVideoCard(video)
            })}

            <Dialog open={isOpenDialog} onClose={closeDialog}>
                <DialogTitle>Publish Video #{selectedVideo.id}</DialogTitle>

                <DialogContent>
                    <Box>
                        <PublishmentForm
                            video={selectedVideo}
                            innerRef={formRef}
                            callBackSuccessFunc={handleSuccessPublish}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogSubmit}>Publish</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}

export default VideoPublishment;