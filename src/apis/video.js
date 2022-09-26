import axios from "axios";
import {getBaseConfig} from "./base";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiFolderBasePath = apiBaseUrl + '/video';
const approvalStatusPending = 1;
const approvalStatusApproved = 2;
const approvalStatusRejected = 3;

export function getAllVideo(params = null) {
    if (!params) {
        return axios.get(apiFolderBasePath, getBaseConfig());
    } else {
        return axios.get(apiFolderBasePath, {...getBaseConfig(), params: params});
    }
}

export function getVideoById(id) {
    return axios.get(apiFolderBasePath + '/' + id, getBaseConfig());
}

export function getAllPendingVideos() {
    let params = {
        'approval_status' : approvalStatusPending
    }
    return axios.get(apiFolderBasePath, {...getBaseConfig(), params: params});
}

export function getAllApprovedVideos() {
    let params = {
        'approval_status' : approvalStatusApproved
    };
    return axios.get(apiFolderBasePath, {...getBaseConfig(), params: params});
}

export function getAllRejectedVideos() {
    let params = {
        'approval_status' : approvalStatusRejected
    }
    return axios.get(apiFolderBasePath, {...getBaseConfig(), params: params});
}

export function approveVideo(id, remarks) {
    return axios.post(apiFolderBasePath + '/approve', {
        video_id: id,
        remarks: remarks
    }, getBaseConfig());
}

export function rejectVideo(id, remarks) {

    return axios.post(apiFolderBasePath + '/reject', {
        video_id: id,
        remarks: remarks
    }, getBaseConfig());
}

