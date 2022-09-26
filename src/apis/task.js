import axios from "axios";
import {getBaseConfig} from "./base";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiFolderBasePath = apiBaseUrl + '/task';

export function getTaskLog() {
    return axios.get(apiFolderBasePath + '/log', getBaseConfig());
}

export function deleteTaskLog() {
    return axios.post(apiFolderBasePath + '/log', {}, getBaseConfig());
}