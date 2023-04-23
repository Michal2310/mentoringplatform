import { useContext } from "react";
import axios, { AxiosError, isAxiosError } from "axios";
import { AuthContext } from "../context/authContext";
const useApi = () => {
    const { token } = useContext(AuthContext);
    const fetchApi = async (url, method, isAuth, config) => {
        try {
            const response = await axios({
                url,
                method,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${token.access_token}`,
                },
                ...config,
            });
            return response.data;
        }
        catch (error) {
            if (isAxiosError(error)) {
                throw new AxiosError("Request failed", error.response?.data);
            }
            else {
                throw error;
            }
        }
    };
    return fetchApi;
};
export default useApi;
