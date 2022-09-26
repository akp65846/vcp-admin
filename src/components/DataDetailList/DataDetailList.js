import {Card, CardHeader, Grid, ListItem} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import React from "react";


const styles = {
    titleContainer: {
        marginBottom: 25
    },
    cardContainer: {
        marginBottom: 25
    }
}

const DataDetailList = ({mainTitle, cardData, ...props}) => {

    return (
        <>
            <Box style={styles.titleContainer}>
                <Typography variant="h3">{mainTitle}</Typography>
            </Box>

            {cardData.map((data, index) => (
                <Card key={index}>
                    <CardHeader title={data.title} />
                    <Divider />
                    <List>
                        {data.items.map((item, index) => (
                            <>
                            <ListItem key={index}>
                                <Grid container>
                                    <Grid xs={3} item>
                                        <Typography>{item.title}</Typography>
                                    </Grid>
                                    <Grid xs={9} item>
                                        {React.isValidElement(item.value) ?
                                            (item.value) :
                                            (<Typography sx={{wordWrap: 'break-word'}}>{item.value}</Typography>)
                                        }
                                    </Grid>
                                </Grid>
                            </ListItem>
                            {data.items.length - 1 !== index && <Divider />}
                            </>
                        ))}
                    </List>
                </Card>
            ))}
        </>
    )
}

export default DataDetailList;