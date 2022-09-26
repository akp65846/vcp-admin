import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export function login(email, password) {
    return axios.post(
        apiBaseUrl + '/auth/login', {
            email: email,
            password: password,
            device_name: 'web'
        }
    )
}