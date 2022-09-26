import {useEffect, useState} from "react";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import {getAllContentCreator} from "../../apis/content-creator";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import DataTable from "../../components/DataTable/DataTable";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function openNewTab(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

function getStatus(params) {
    return params.row.status === 1 ? 'Active' : 'Inactive';
}

function ContentCreator(props) {

    const [creatorData, setCreatorData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getAllContentCreator().then((res) => {
            setCreatorData(res.data.data);
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
    },[]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'platform_id', headerName: 'Platform', width: 100 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'profile_url', headerName: 'Profile', width: 250 },
        {
            field: 'status',
            headerName: 'Status',
            valueGetter: getStatus,
            width: 100
        },
        {
            field: 'last_processed_time',
            headerName: 'Last Processed Time',
            type: 'dateTime',
            valueGetter: ({value}) => value && new Date(value),
            width: 200
        },
        {
            field: 'created_time',
            headerName: 'Created Time',
            type: 'dateTime',
            valueGetter: ({value}) => value && new Date(value),
            width: 200
        },
        {
            field: 'actions',
            type: 'actions',
            flex: 1,
            getActions: (params) => [
                <GridActionsCellItem icon={<PersonSearchIcon />} label="Profile" onClick={()=> {params.row.profile_url && openNewTab( params.row.profile_url)}}/>,
                <GridActionsCellItem icon={<ManageSearchIcon />} label="Detail" onClick={() => {navigate(`./${params.row.id}`)}}/>
            ],
        }
    ];


    return (
        <>
            <h2>Content Creators</h2>

            <DataTable
                tableData={creatorData}
                columnSettings={columns}
            />
        </>
    )
}

export default ContentCreator;