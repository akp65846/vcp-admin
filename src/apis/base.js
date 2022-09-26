export function getBaseConfig() {
    return {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
        }
    }
}