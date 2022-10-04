import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Chip, Icon} from "@mui/material";

const styles = {
    container: {
        p:3,
        backgroundColor: '#272727',
        display: "flex",
        flexDirection: "row",
        height: '100%'
    },
    contentContainer: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        height: '100%'
    },
    numberText: {
        marginBottom: 1
    },
    labelText: {
        color: "#a9acb3",
        marginBottom: 1
    },
    comparisonContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    }
}

const StatisticBox = ({value, label, comparison, iconElement, ...props}) => {
    return (
        <Box sx={styles.container}>
            <Box sx={styles.contentContainer}>
                <Typography variant="h4" sx={styles.numberText}>{value}</Typography>
                <Typography sx={styles.labelText}>{label}</Typography>

                {comparison &&
                    <Box sx={styles.comparisonContainer}>
                        <Chip label={comparison.label} sx={{backgroundColor: 'green'}} size="small" />
                        <Typography sx={{marginLeft: 1}} variant="subtitle2" color="#a9acb3">{comparison.text}</Typography>
                    </Box>
                }
            </Box>

            {iconElement &&
                <Box>
                    {iconElement}
                </Box>
            }
        </Box>
    )
}

export default StatisticBox;