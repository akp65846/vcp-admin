import {useEffect, useRef, useState} from "react";
import {
    Button,
    Chip, Dialog, DialogActions, DialogContent, DialogTitle,
    Grid
} from "@mui/material";
import Box from "@mui/material/Box";
import {getAllVideo} from "../../apis/video";
import Typography from "@mui/material/Typography";
import {getAllContentCreator} from "../../apis/content-creator";
import ApprovalForm from "../../forms/ApprovalForm";
import VideoCard from "../../components/VideoCard/VideoCard";
import {getMbDisplay} from "../../utils/filesize";
import {toast} from "react-toastify";
import {getDate} from "../../utils/date";

function getTagElements(video) {
    let elements = [];
    if(video.duration < 60) {
        elements.push(<Chip label="Youtube Short" size={"small"} color={"secondary"} key={2} sx={{marginRight: 0.5}} />)
    }

    return elements;
}

function VideoApproval() {

    const formRef= useRef();
    const [pendingVideos, setPendingVideos] = useState([]);
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    const [activeModalData, setActiveModalData] = useState({
        'is_approve': false,
        'video_id': null,
    })

    const openModal = (videoId, isApprove) => {
        setActiveModalData({...activeModalData, is_approve: isApprove, video_id: videoId});
        setIsOpenDialog(true);
    }

    const closeModal = () => {
        setIsOpenDialog(false);
    }

    const handleDialogSubmit = () => {
        if (formRef.current) {
            formRef.current.handleSubmit();
        }
    }

    const handleSuccessApproval = (videoId) => {
        setPendingVideos(pendingVideos.filter((video) => {
            return video.id !== videoId
        }))
        closeModal();
    }

    useEffect(() => {
        Promise.all([getAllVideo({approval_status: 1, order_by: 'created_time', order: 'desc'}), getAllContentCreator()]).then((res) => {
            let videos = res[0].data.data;
            let contentCreators = res[1].data.data;

            videos.forEach((video) => {
                contentCreators.forEach((creator) => {
                    if (creator.id === video.content_creator_id) {
                        video.content_creator_name = creator.name;
                        video.content_creator_profile_icon_url = creator.profile_icon_url;
                    }
                })
            })

            setPendingVideos(videos);
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
    }, [])

    function getCardVideo(video) {
        let formattedDate = getDate(video.created_time)
        let tagElements = getTagElements(video);

        let cardActions = (
            <>
                <Button variant="contained" color="success" onClick={() => {
                    openModal(video.id, true)
                }}>
                    Approve
                </Button>
                <Button variant="contained" color="error" onClick={() => {
                    openModal(video.id, false)
                }}>
                    Reject
                </Button>
            </>
        );

        let cardDetails = (
            <>
                <Typography>Duration: {video.duration ? video.duration + 's' : "-"}</Typography>
                <Typography>Size: {video.size ? getMbDisplay(video.size) : "-"}</Typography>
                <Typography>Dimension: {video.height} x {video.width}</Typography>
            </>
        );

        return (
            <Grid item xs={12} md={6} lg={4} xl={3} key={video.id}>
                <Box style={{height: '100%'}}>
                    <VideoCard
                        creatorIcon={video.content_creator_profile_icon_url}
                        creatorName={video.content_creator_name}
                        createdDate={formattedDate}
                        videoCoverImg={video.cover_image_url ? video.cover_image_url : video.source_url}
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
            {pendingVideos.map((video) => {
                return getCardVideo(video)
            })}

            <Dialog
                open={isOpenDialog}
                onClose={closeModal}
                PaperProps={{sx: {minWidth: "30%"}}}
            >
                <DialogTitle>{activeModalData.is_approve ? 'Approve Video #' + activeModalData.video_id : 'Reject Video #' + activeModalData.video_id}</DialogTitle>
                <DialogContent>
                    <Box>
                        <ApprovalForm
                            videoId={activeModalData.video_id}
                            isApprove={activeModalData.is_approve}
                            innerRef={formRef}
                            callBackSuccessFunc={handleSuccessApproval}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogSubmit}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}

export default VideoApproval;