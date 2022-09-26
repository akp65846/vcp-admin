import {useEffect, useState} from "react";
import {getAllVideo} from "../../apis/video";
import {DataGrid, GridActionsCellItem, GridToolbar} from "@mui/x-data-grid";
import {getAllPlatform} from "../../apis/platform";
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import {Chip} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import {useNavigate} from "react-router-dom";

function openNewTab(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

function getDisplaySize(params) {
    const videoHeight = params.row.height;
    const videoWidth = params.row.width;
    const size = params.row.size;
    const sizeInMb = (size/1000/1000).toFixed(2);

    return videoHeight + ' x ' + videoWidth + ' (' + sizeInMb + 'MB)';
}

function getDisplayStatus(params) {
    const status = params.row.status;
    if (status === 1) {
        return 'Active'
    } else {
        return 'Inactive'
    }
}

// function getDisplayDuration(params) {
//     if (params.row.duration) {
//         return params.row.duration + 's';
//     } else {+
//         return "";
//     }
// }

function Video() {

    const [videoData, setVideoData] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {

        Promise.all([getAllVideo(), getAllPlatform()]).then((allRes) => {
            const videos = allRes[0].data.data;
            const platform = allRes[1].data.data;
            const platformIdNameMapping = [];

            platform.forEach((element) => {
                platformIdNameMapping[element.id] = element.name;
            })

            videos.forEach((video) => {
                video.platform_name = video.hasOwnProperty('platform_id') ? platformIdNameMapping[video.platform_id] : "";
            })

            setVideoData(videos);
        }).catch((error) => {
            console.log(error);
        })
    },[setVideoData]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        {
            field: 'platform_name',
            headerName: 'Platform',
            width: 100 ,
        },
        { field: 'media_id', headerName: 'Media ID', width: 100 },
        { field: 'title', headerName: 'Title', width: 300},
        {
            field: 'size',
            headerName: 'Size',
            width: 180,
            valueGetter: getDisplaySize
        },
        {
            field: 'duration',
            headerName: 'Duration (s)',
            width: 100,
        },
        {
            field: 'approval_status',
            headerName: 'Approval Status',
            renderCell: (({value}) => {
                if (value === 2) {
                    return <Chip icon={<DoneIcon/>} label="Approved" color="success"/>
                } else if (value === 3) {
                    return <Chip icon={<ClearIcon />} label="Rejected" color="error"/>
                } else {
                    return <Chip icon={<HorizontalRuleIcon/>} label="Pending"/>
                }
            }),
            width: 150
        },
        {
            field: 'approval_time',
            headerName: 'Approval Time',
            type: 'dateTime',
            valueGetter: ({value}) => value && new Date(value),
            width: 200
        },
        {
            field: 'status',
            headerName: 'Status',
            valueGetter: getDisplayStatus,
            width: 100
        },
        {
            field: 'created_time',
            headerName: 'Created Time',
            type: 'dateTime',
            valueGetter: ({value}) => value && new Date(value),
            width: 200
        },
        {
            field: 'remarks',
            headerName: 'Remarks',
            width: 200
        },
        {
            field: 'actions',
            type: 'actions',
            flex: 1,
            getActions: (params) => [
                <GridActionsCellItem icon={<VideoLibraryIcon />} label="Profile" onClick={()=> {params.row.source_url && openNewTab( params.row.source_url)}}/>,
                <GridActionsCellItem icon={<ManageSearchIcon />} label="Detail" onClick={()=> {navigate(`./${params.row.id}`)}} />,

            ],
        }
    ];

    return (
        <>
            <h2>Videos</h2>

            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid
                        rows={videoData}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        disableSelectionOnClick
                        // checkboxSelection
                        autoHeight
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        initialState={{
                            columns: {
                                columnVisibilityModel: {
                                    remarks: false,
                                    media_id: false,
                                    status: false,
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default Video;