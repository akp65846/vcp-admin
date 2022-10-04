import {useEffect, useRef, useState} from "react";
import {
    Button,
    Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl,
    Grid, InputAdornment, InputLabel, LinearProgress, MenuItem, Pagination, Select, Stack, TextField
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
import FilterSideBar from "../../components/FilterSideBar/FilterSideBar";
import Toolbar from "@mui/material/Toolbar";
import {getAllSourcePlatforms} from "../../apis/platform";
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import {DesktopDatePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';


const postPerPage = 20;

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
    const [platforms, setPlatforms] = useState([]);
    const [contentCreators, setContentCreators] = useState([]);

    // Boolean settings
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [isOpenFilterBar, setIsOpenFilterBar] = useState(false);

    // Filter Bar Value
    const [filterPlatform, setFilterPlatform] = useState([]);
    const [filterContentCreator, setFilterContentCreator] = useState([]);
    const [filterTitle, setFilterTitle] = useState('');
    const [filterStartDate, setFilterStartDate] = useState(null);
    const [filterEndDate, setFilterEndDate] = useState(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);

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

        let searchMode = false;

        let videoApiParams = {
            approval_status: 1,
            order_by: 'created_time',
            order: 'desc',
            limit: postPerPage,
            offset: (currentPage - 1) * postPerPage
        };

        if (filterPlatform.length) {
            videoApiParams.platform_id = filterPlatform.join(",");
        }

        if (filterContentCreator.length) {
            videoApiParams.content_creator_id = filterContentCreator.join(",");
        }

        if (filterStartDate) {
            videoApiParams.created_time_start = filterStartDate;
        }

        if (filterEndDate) {
            videoApiParams.created_time_end = filterEndDate;
        }

        if (filterTitle && filterTitle !== '') {
            videoApiParams.title = filterTitle;
        }

        if (searchMode) {
            videoApiParams.offset = 0;
        } else {
            videoApiParams.offset = (currentPage - 1) * postPerPage;
        }

        Promise.all([getAllVideo(videoApiParams), getAllContentCreator(), getAllSourcePlatforms()]).then((res) => {
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

            setTotal(res[0].data.count);
            setContentCreators(contentCreators);
            setPlatforms(res[2].data.data);
            setPendingVideos(videos);
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
    }, [filterPlatform, filterContentCreator, filterTitle, filterStartDate, filterEndDate, currentPage]);

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
                <Typography>Dimension: {video.height && video.width ? (video.height + ' x ' + video.width) : '-'}</Typography>
            </>
        );

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

    const filterBarContent = (
        <Box sx={{width: 350, paddingX: 3, paddingY: 3}}>
            <Toolbar />

            <FormControl fullWidth sx={{marginBottom: 2}}>

                <TextField
                    id="title-search"
                    label="Title"
                    variant="outlined"
                    value={filterTitle}
                    onChange={(event) => {setCurrentPage(1); setFilterTitle(event.target.value);}}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />
            </FormControl>

            <FormControl fullWidth sx={{marginBottom: 2}}>
                <InputLabel id="platform-select-label">Platform</InputLabel>
                <Select
                    labelId="platform-select"
                    id="platform-select"
                    value={filterPlatform}
                    label="Platform"
                    onChange={(event) => {setCurrentPage(1); setFilterPlatform(event.target.value);}}
                    // input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => {
                                let platform = platforms.find((platform) => (platform.id === value)) ;
                                return (<Chip key={value} label={platform.name} />);
                            })}
                        </Box>
                    )}
                    multiple
                >
                    {platforms.map((platform) => (
                        <MenuItem key={platform.id} value={platform.id}>{platform.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{marginBottom: 2}}>
                <InputLabel id="creator-select-label">Content Creator</InputLabel>
                <Select
                    labelId="creator-select"
                    id="creator-select"
                    value={filterContentCreator}
                    label="Content Creator"
                    onChange={(event) => {setCurrentPage(1); setFilterContentCreator(event.target.value)}}
                    // input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => {
                                let contentCreator = contentCreators.find((contentCreator) => (contentCreator.id === value)) ;
                                return (<Chip key={value} label={contentCreator.name} />);
                            })}
                        </Box>
                    )}
                    multiple
                >
                    {contentCreators.map((contentCreator) => (
                        <MenuItem key={contentCreator.id} value={contentCreator.id}>{contentCreator.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Typography variant="subtitle2" sx={{marginY: 2}}>Created Date</Typography>
            <FormControl fullWidth sx={{marginBottom: 2}}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                        onChange={(moment)=> {setCurrentPage(1); setFilterStartDate(moment.startOf('day').format('YYYY-MM-DD HH:mm:ss'))}}
                        value={filterStartDate}
                        label="From"
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </FormControl>
            <FormControl fullWidth sx={{marginBottom: 2}}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                        onChange={(moment)=> {setCurrentPage(1); setFilterEndDate(moment.endOf('day').format('YYYY-MM-DD HH:mm:ss'))}}
                        value={filterEndDate}
                        label="End"
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </FormControl>
        </Box>
    )

    return (

        <>
            <Box sx={{ width: '100%', marginBottom: 2 }}>
                {/*<LinearProgress />*/}
                <Button variant="contained" onClick={() => {setIsOpenFilterBar(true)}} startIcon={<FilterListIcon />}>Filter</Button>
            </Box>
            {/*<Box sx={{marginBottom: 2}}>*/}
            {/*    <Button variant="contained" onClick={() => {setIsOpenFilterBar(true)}} startIcon={<FilterListIcon />}>Filter</Button>*/}
            {/*</Box>*/}

            <Box sx={{marginBottom: 2}}>
                <Stack direction="row" spacing={1}>
                    {filterPlatform.map((id) => {
                        let platform = platforms.find((platform) => (platform.id === id));
                        return (
                            <Chip
                                label={platform.name}
                                onDelete={() => {
                                    setFilterPlatform(filterPlatform.filter(((platformId) => platformId !== id)))
                                }}
                            />
                        )
                    })}

                    {filterContentCreator.map((id) => {
                        let creator = contentCreators.find((creator) => (creator.id === id));
                        return (
                            <Chip
                                label={creator.name}
                                onDelete={() => {
                                    setFilterContentCreator(filterContentCreator.filter(((creatorId) => creatorId !== id)))
                                }}
                            />
                        )
                    })}
                </Stack>
            </Box>


            <FilterSideBar
                isOpen={isOpenFilterBar}
                handleClose={() => {setIsOpenFilterBar(false)}}
                drawerElements={filterBarContent}
            />

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

            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{marginY: 2}}>
                <Pagination count={Math.ceil(total/postPerPage)} onChange={(event, page) => {setCurrentPage(page)}} page={currentPage}/>
            </Box>
        </>
    )
}

export default VideoApproval;