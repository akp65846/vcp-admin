import {useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import {toast} from "react-toastify";

const AuthContext = React.createContext(null);

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();

    const [token, setToken] = useState(sessionStorage.getItem('access_token'));

    const afterLogin = (token) => {
        setToken(token);
        sessionStorage.setItem('access_token', token);
        toast.success('Login Success');
        navigate('/overview');
    }

    const handleLogout = () => {
        sessionStorage.removeItem('access_token');
        setToken(null);
    }

    const value = {
        token,
        afterLogin: afterLogin,
        handleLogout: handleLogout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}
