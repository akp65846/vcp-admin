import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/login/Login";
import {Route, Routes} from "react-router-dom";
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Dashboard from "./pages/dashboard/Dashboard";
import Platform from "./pages/platform/Platform";
import TaskLog from "./pages/task-log/TaskLog";
import ContentCreator from "./pages/content-creator/ContentCreator";
import Overview from "./pages/overview/Overview";
import Video from "./pages/video/Video";
import Publishment from "./pages/publishment/Publishment";
import VideoView from "./pages/video/VideoView";
import VideoApproval from "./pages/video-approval/VideoApproval";
import VideoPublishment from "./pages/video-publishment/VideoPublishment";
import Layout from "./components/Layout/Layout";
import {AuthProvider} from "./pages/login/AuthProvider";
import ProtectedRoute from "./routes/ProtectedRoute";
import PlatformView from "./pages/platform/PlatformView";
import ContentCreatorView from "./pages/content-creator/ContentCreatorView";

function App() {

    return (
                <AuthProvider>
                        <Routes>
                            <Route path="/" index element={<Login/>} />
                            <Route element={<Layout />}>
                                <Route path="overview" element={<ProtectedRoute><Overview /></ProtectedRoute>} />
                                <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                                <Route path="platform" element={<ProtectedRoute><Platform /></ProtectedRoute>} />
                                <Route path="platform/:platformId" element={<ProtectedRoute><PlatformView /></ProtectedRoute>} />
                                <Route path="task-log" element={<ProtectedRoute><TaskLog /></ProtectedRoute>} />
                                <Route path="content-creator" element={<ProtectedRoute><ContentCreator /></ProtectedRoute>} />
                                <Route path="content-creator/:contentCreatorId" element={<ProtectedRoute><ContentCreatorView /></ProtectedRoute>} />
                                <Route path="publishment" element={<ProtectedRoute><Publishment /></ProtectedRoute>} />
                                <Route path="video" element={<ProtectedRoute><Video /></ProtectedRoute>}></Route>
                                <Route path="video/:videoId" element={<ProtectedRoute><VideoView /></ProtectedRoute>}/>
                                <Route path="video-approval" element={<ProtectedRoute><VideoApproval /></ProtectedRoute>} />
                                <Route path="video-publishment" element={<ProtectedRoute><VideoPublishment /></ProtectedRoute>} />
                                <Route path="task-log" element={<ProtectedRoute><TaskLog /></ProtectedRoute>} />
                            </Route>
                        </Routes>
                </AuthProvider>
    )
}

export default App;