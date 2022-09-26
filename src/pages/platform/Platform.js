import {useEffect, useState} from "react";
import {getAllPlatform} from "../../apis/platform";
import {GridActionsCellItem} from "@mui/x-data-grid";
import DataTable from "../../components/DataTable/DataTable";
import PublicIcon from '@mui/icons-material/Public';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function openNewTab(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

function getStatus(params) {
    return params.row.status === 1 ? 'Active' : 'Inactive';
}

function getType(params) {
    const type = params.row.type;

    if (type === 1) {
        return 'Source'
    } else if (type === 2) {
        return 'Target'
    } else {
        return ''
    }
}

function Platform() {

    const [platformData, setPlatformData] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        getAllPlatform().then((res) => {
            setPlatformData(res.data.data);
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
    },[]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'group', headerName: 'Group', width: 150 },
        {
            field: 'type',
            headerName: 'Type',
            valueGetter: getType,
            width: 150
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 250
        },
        {
            field: 'status',
            headerName: 'Status',
            valueGetter: getStatus,
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
            field: 'actions',
            type: 'actions',
            flex: 1,
            getActions: (params) => [
                <GridActionsCellItem icon={<PublicIcon />} label="url" onClick={()=> {openNewTab(params.row.url)}} />,
                <GridActionsCellItem icon={<ManageSearchIcon />} label="Detail" onClick={() => {navigate(`./${params.row.id}`)}}/>
            ],
        }
    ];

    return (
        <>
            <h2>Platforms</h2>


            <DataTable
                tableData={platformData}
                columnSettings={columns}
            />
        </>
    )
}

export default Platform;