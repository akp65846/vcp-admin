import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Container} from "@mui/material";
import {getPlatformById} from "../../apis/platform";
import {toast} from "react-toastify";
import DataDetailList from "../../components/DataDetailList/DataDetailList";
import {getDateTimeDisplay} from "../../utils/date";

const VideoView = () => {
    let params = useParams();

    const [platform, setPlatform] = useState({});

    useEffect(() => {
        const id = params.platformId;

        getPlatformById(id).then((res) => {
            setPlatform(res.data.data);
        }).catch((error) => {
            toast.error(error.response.data.message);
        })

    },[params.platformId]);

    if (Object.keys(platform).length !== 0) {

        let data = [
            {
                title: 'General Info',
                items: [
                    {
                        title: 'ID',
                        value: platform.id
                    },
                    {
                        title: 'Name',
                        value: platform.name
                    },
                    {
                        title: 'Group',
                        value: platform.group
                    },
                    {
                        title: 'Type',
                        value: platform.type
                    },
                    {
                        title: 'Url',
                        value: platform.url
                    },
                    {
                        title: 'Description',
                        value: platform.description
                    },
                    {
                        title: 'Status',
                        value: platform.status
                    },
                    {
                        title: 'Created Time',
                        value: getDateTimeDisplay(platform.created_time)
                    },
                    {
                        title: 'Updated Time',
                        value: getDateTimeDisplay(platform.updated_time)
                    }
                ]
            }
        ]

        return (
            <Container maxWidth="md">
                <DataDetailList
                    mainTitle={`#${platform.id} ${platform.name}`}
                    cardData={data}
                />
            </Container>
        )
    } else {
        return <></>
    }

}
export default VideoView;