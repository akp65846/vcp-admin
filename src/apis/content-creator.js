import axios from "axios";
import {getBaseConfig} from "./base";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiFolderBasePath = apiBaseUrl + '/content-creator';

export function getAllContentCreator() {
    return axios.get(apiFolderBasePath, getBaseConfig());
}

export function getContentCreatorById(id) {
    return axios.get(apiFolderBasePath + '/' + id, getBaseConfig());
}