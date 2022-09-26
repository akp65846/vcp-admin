import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import defaultTheme from "./themes/defaultTheme";
import {Provider} from "react-redux";
import store from "./redux/store";
import {ToastContainer} from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
                <ToastContainer />
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </Provider>

    // <Provider store={store}>
    //     <ThemeProvider theme={defaultTheme}>
    //         <BrowserRouter>
    //             <Routes>
    //                 <Route path="/" element={<App />}>
    //                     <Route path="overview" element={<Overview />} />
    //                     <Route path="dashboard" element={<Dashboard />} />
    //                     <Route path="platform" element={<Platform />} />
    //                     <Route path="task-log" element={<TaskLog />} />
    //                     <Route path="content-creator" element={<ContentCreator />} />
    //                     <Route path="publishment" element={<Publishment />} />
    //                     <Route path="video" element={<Video />}></Route>
    //                     <Route path="video/:videoId" element={<VideoView />}/>
    //                     <Route path="video-approval" element={<VideoApproval />} />
    //                     <Route path="video-publishment" element={<VideoPublishment />} />
    //                 </Route>
    //                 <Route path="/login" element={<Login />} />
    //             </Routes>
    //         </BrowserRouter>
    //     </ThemeProvider>
    // </Provider>


    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
