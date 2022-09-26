import {Avatar, Card, CardActions, CardContent, CardHeader, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const styles = {
    'card' : {
        minHeight: 200,
        display: 'flex',
        height: '100%',
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    details: {
        marginTop: 10
    }
}

const VideoCard = ({
            creatorIcon,
            creatorName,
            createdDate,
            videoCoverImg,
            videoSourceUrl,
            mainTitle,
            details,
            tagElements,
            actions,
           ...props
}) => {

    function openNewTab(url) {
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    return (
        <Card sx={styles.card}>
            <CardContent>
                <CardHeader
                    avatar={<Avatar src={creatorIcon} />}
                    title={creatorName}
                    subheader={createdDate}
                />
                <CardMedia
                    component="img"
                    height="400"
                    image={videoCoverImg}
                    sx={{marginBottom: 3}}
                    onClick={() => {
                        openNewTab(videoSourceUrl)
                    }}
                />
                <Box style={{marginBottom: 8}}>
                    {tagElements.map((tag) => (
                        tag
                    ))}
                </Box>
                <Typography variant="h5" component="div">
                    {mainTitle}
                </Typography>

                <div style={styles.details}>
                    {details}
                </div>
            </CardContent>
            <CardActions sx={{marginBottom: 3}}>
                {actions}
            </CardActions>
        </Card>
    )
}

export default VideoCard;