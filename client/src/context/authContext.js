import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState } from "react";
const defaultState = {
    token: {
        access_token: "",
        refresh_token: "",
    },
    setToken: (token) => { },
    user: {},
    setUser: (user) => { },
};
export const AuthContext = createContext(defaultState);
const AuthProvider = ({ children }) => {
    const [token, setToken] = useState({});
    const [user, setUser] = useState({});
    return _jsx(AuthContext.Provider, { value: { token, setToken, user, setUser }, children: children });
};
export default AuthProvider;
