import {useEffect, useState} from "react";
import {getAllPlatform} from "../../apis/platform";
import {getAllPublishment} from "../../apis/publishment";
import {toast} from "react-toastify";
import DataTable from "../../components/DataTable/DataTable";
import {getDateTimeDisplay} from "../../utils/date";
import {getPublishmentIsNotifySubscribers} from "../../models/PublishmentModel";

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 50
    },
    {
        field: 'source_platform_name',
        headerName: 'Source Platform',
        width: 150
    },
    {
        field: 'target_platform_name',
        headerName: 'Target Platform',
        width: 150
    },
    {
        field: 'title',
        headerName: 'Title',
        width: 200
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 250
    },
    {
        field: 'video_id',
        headerName: 'Video ID',
        width: 100
    },
    {
        field: 'media_id',
        headerName: 'Media ID',
        width: 100
    },
    {
        field: 'is_notify_subscribers',
        headerName: 'Notify Subscribers',
        valueGetter: ((params) => (getPublishmentIsNotifySubscribers(params.row.is_notify_subscribers))),
        width: 150
    },
    {
        field: 'scheduled_time',
        headerName: 'Scheduled Time',
        valueGetter: ((params) => (getDateTimeDisplay(params.row.scheduled_time))),
        width: 180
    },
    {
        field: 'created_time',
        headerName: 'Created Time',
        valueGetter: ((params) => (getDateTimeDisplay(params.row.created_time))),
        width: 180
    },
    {
        field: 'updated_time',
        headerName: 'Updated Time',
        valueGetter: ((params) => (getDateTimeDisplay(params.row.updated_time))),
        width: 180
    }
];

function Publishment() {

    const [publishmentData, setPublishmentData] = useState([]);

    useEffect(() => {

        Promise.all([getAllPublishment(), getAllPlatform()]).then((allRes) => {
            const publishments = allRes[0].data.data;
            const platform = allRes[1].data.data;
            const platformIdNameMapping = [];

            platform.forEach((element) => {
                platformIdNameMapping[element.id] = element.name;
            })

            publishments.forEach((publishment) => {
                publishment.source_platform_name = publishment.hasOwnProperty('source_platform_id') ? platformIdNameMapping[publishment.source_platform_id]: "";
                publishment.target_platform_name = publishment.hasOwnProperty('target_platform_id') ? platformIdNameMapping[publishment.target_platform_id]: "";

            })

            setPublishmentData(publishments);
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
    },[]);
    return (
        <>
            <h2>Publishments</h2>

            <DataTable
                tableData={publishmentData}
                columnSettings={columns}
            />
        </>
    )
}

export default Publishment;