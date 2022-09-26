import {useAuth} from "../pages/login/AuthProvider";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const {token} = useAuth();

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;