import {createTheme} from "@mui/material";

const defaultTheme = createTheme({
    palette: {
      mode: 'dark'
    },
    typography: {
        // In Chinese and Japanese the characters are usually larger,
        // so a smaller fontsize may be appropriate.
        fontSize: 13,
    },
});

export default defaultTheme;