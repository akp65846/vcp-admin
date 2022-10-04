import {Grid, LinearProgress} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import * as React from "react";
import {useEffect, useState} from "react";
import {getAllVideo} from "../../apis/video";
import moment from "moment";
import StatisticBox from "../../components/StatisticBox/StatisticBox";
import PublishIcon from '@mui/icons-material/Publish';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import RuleIcon from '@mui/icons-material/Rule';
import {getAllPublishment} from "../../apis/publishment";
import DonutChart from "../../components/DonutChart/DonutChart";
import {getAllPlatform} from "../../apis/platform";
import {getAllContentCreator} from "../../apis/content-creator";
import BarChat from "../../components/BarChat/BarChat";
import RadiaBarChart from "../../components/RadiaBarChart/RadiaBarChart";

function Overview() {

    const [todayVideo, setTodayVideo] = useState([]);
    const [todayPublishment, setTodayPublishment] = useState([]);
    const [platforms, setAllPlatforms] = useState([]);
    const [todayApprovedCount, setTodayApprovedCount] = useState(0);
    const [todayRejectedCount, setTodayRejectedCount] = useState(0);
    const [todayPendingCount, setTodayPendingCount] = useState(0);

    useEffect(() => {
        let todayStart = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
        let todayEnd = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');

        Promise.all([
            getAllVideo({created_time_start: todayStart, created_time_end: todayEnd}),
            getAllPublishment({created_time_start: todayStart, created_time_end: todayEnd}),
            getAllPlatform(),
            // getAllContentCreator()
        ]).then((res) => {
            let video = res[0].data.data;
            let publishments = res[1].data.data;
            let platforms = res[2].data.data;
            let pendingCount = 0;
            let approvedCount = 0;
            let rejectedCount = 0;

            platforms.forEach((platform) => {
                platform.video_count = 0;
                platform.publishment_count = 0;
            })

            video.forEach((video) => {
                if (video.approval_status === 2) {
                    approvedCount++;
                } else if (video.approval_status === 3) {
                    rejectedCount++;
                } else {
                    pendingCount++;
                }

                let platform = platforms.find((platform) => platform.id === video.platform_id);
                platform.video_count++;
            });

            publishments.forEach((publishment) => {
                let platform = platforms.find((platform) => platform.id === publishment.target_platform_id);
                platform.publishment_count++;
            })


            setTodayApprovedCount(approvedCount);
            setTodayRejectedCount(rejectedCount);
            setTodayPendingCount(pendingCount);
            setTodayVideo(video);
            setAllPlatforms(platforms);
            setTodayPublishment(publishments);
        });
    }, []);

    let platformLabel = [];
    let platformVideoSeries = [];

    let platformPublishmentLabel = [];
    let platformPublishmentSeries = [];

    platforms.forEach((platform) => {

        if (platform.type === 1) {
            platformLabel.push(platform.name);
            platformVideoSeries.push(platform.video_count);
        } else if (platform.type === 2) {
            platformPublishmentLabel.push(platform.name);
            platformPublishmentSeries.push(platform.publishment_count * 1600 / 10000 * 100);
        }
    })

    return (
        <>
            <Box sx={{marginBottom: 2}}>
                <Typography variant="h5">Today Summary</Typography>
            </Box>
            <Grid container spacing={3} sx={{marginBottom: 4}}>
                <Grid xs={3} item>
                    <StatisticBox
                        value={todayVideo.length}
                        label="Videos"
                        comparison={{
                            label: "+20%",
                            text: "To previous week"
                        }}
                        iconElement={<SlowMotionVideoIcon sx={{fontSize: 50}}/>}
                    />
                </Grid>

                <Grid xs={3} item>
                    <StatisticBox
                        value={todayPublishment.length}
                        label="Publishment"
                        comparison={{
                            label: "+20%",
                            text: "To previous week"
                        }}
                        iconElement={<PublishIcon sx={{fontSize: 50}}/>}
                    />
                </Grid>

                <Grid xs={3} item>
                    <StatisticBox
                        value={todayPendingCount}
                        label="Pending Approval"
                        iconElement={<PendingActionsIcon sx={{fontSize: 50}}/>}
                    />
                </Grid>

                <Grid xs={3} item>
                    <StatisticBox
                        value={todayApprovedCount + ' / ' + todayRejectedCount}
                        label="Approved / Rejected"
                        iconElement={<RuleIcon sx={{fontSize: 50}}/>}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3} sx={{marginBottom: 4}}>
                <Grid xs={4} item>
                    <DonutChart
                        label={platformLabel}
                        series={platformVideoSeries}
                        title="Video Source"
                    />
                </Grid>

                <Grid xs={4} item>
                    <RadiaBarChart
                        label={platformPublishmentLabel}
                        series={platformPublishmentSeries}
                        title="Youtube API Quota"
                        total={todayPublishment.length}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default Overview;