import { jsx as _jsx } from "react/jsx-runtime";
import { useContext, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import useApi from "../../hooks/useApi";
import { AuthContext } from "../../context/authContext";
const Logout = () => {
    const fetchData = useApi();
    const queryClient = useQueryClient();
    const navigator = useNavigate();
    const { setUser } = useContext(AuthContext);
    const { mutateAsync } = useMutation({
        mutationKey: ["user"],
        mutationFn: async () => fetchData("/api/auth/logout", "post", true),
    });
    useEffect(() => {
        handleLogout();
        mutateAsync();
    }, []);
    function handleLogout() {
        queryClient.invalidateQueries(["receivedMentorships"]);
        queryClient.invalidateQueries(["myMentorships"]);
        queryClient.clear();
        queryClient.removeQueries();
        setUser({});
        navigator("/");
    }
    return _jsx("div", {});
};
export default Logout;
