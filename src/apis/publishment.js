import axios from "axios";
import {getBaseConfig} from "./base";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiFolderBasePath = apiBaseUrl + '/publishment';

export function getAllPublishment(params = null) {
    if (!params) {
        return axios.get(apiFolderBasePath, getBaseConfig());
    } else {
        return axios.get(apiFolderBasePath, {...getBaseConfig(), params: params});
    }
}

export function publishVideo(videoId, platformId, scheduledTime, title, description, isNotifySubscriber) {
    return axios.post(apiFolderBasePath + '/publish', {
        video_id: videoId,
        target_platform_id: platformId,
        scheduled_time: scheduledTime,
        title: title,
        description: description,
        isNotifySubscriber: isNotifySubscriber
    }, getBaseConfig());
}