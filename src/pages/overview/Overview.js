import {useAuth} from "../login/AuthProvider";

function Overview() {

    const {token} = useAuth();
    const accessToken = sessionStorage.getItem('access_token');

    return (
        <>
            <h2>Access token (Session): {accessToken}</h2>
            <h2>Access token (State): {token}</h2>
        </>
    )
}

export default Overview;