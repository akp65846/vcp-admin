import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getContentCreatorById} from "../../apis/content-creator";
import {toast} from "react-toastify";
import {Container} from "@mui/material";
import DataDetailList from "../../components/DataDetailList/DataDetailList";
import {getDate, getDateTimeDisplay} from "../../utils/date";

function ContentCreatorView() {
    let params = useParams();

    const [contentCreator, setContentCreator] = useState({});

    useEffect(() => {
        const id = params.contentCreatorId;

        getContentCreatorById(id).then((res) => {
            setContentCreator(res.data.data);
        }).catch((error) => {
            toast.error(error.response.data.message);
        })

    }, [params.contentCreatorId]);

    if (Object.keys(contentCreator).length !== 0) {

        let data = [
            {
                title: 'General Info',
                items: [
                    {
                        title: 'ID',
                        value: contentCreator.id
                    },
                    {
                        title: 'Platform',
                        value: contentCreator.platform_id
                    },
                    {
                        title: 'Platform Unique ID',
                        value: contentCreator.platform_unique_uid
                    },
                    {
                        title: 'Name',
                        value: contentCreator.name
                    },
                    {
                        title: 'Profile Url',
                        value: contentCreator.profile_url
                    },
                    {
                        title: 'Max Video Duration',
                        value: contentCreator.max_video_duration
                    },
                    {
                        title: 'status',
                        value: contentCreator.status
                    },
                    {
                        title: 'Last Processed Time',
                        value: getDateTimeDisplay(contentCreator.last_processed_time)
                    },
                    {
                        title: 'Created Time',
                        value: getDateTimeDisplay(contentCreator.created_time)
                    },
                    {
                        title: 'Updated Time',
                        value: getDateTimeDisplay(contentCreator.updated_time)
                    }
                ]
            }
        ]

        return (
            <Container maxWidth="md">
                <DataDetailList
                    mainTitle={`#${contentCreator.id} ${contentCreator.name}`}
                    cardData={data}
                />
            </Container>
        )
    } else {
        return <></>
    }
}

export default ContentCreatorView;