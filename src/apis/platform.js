import axios from "axios";
import {getBaseConfig} from "./base";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const apiFolderBasePath = apiBaseUrl + '/platform';

export function getAllPlatform() {
    return axios.get(apiFolderBasePath, getBaseConfig());
}

export function getAllSourcePlatforms() {
    let params = {
        type: 1
    }
    return axios.get(apiFolderBasePath, {...getBaseConfig(), params: params})
}

export function getAllTargetPlatforms() {
    let params = {
        type: 2
    }
    return axios.get(apiFolderBasePath, {...getBaseConfig(), params: params})
}

export function getPlatformById(id) {
    return axios.get(apiFolderBasePath + '/' + id, getBaseConfig());
}