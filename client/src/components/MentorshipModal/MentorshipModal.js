import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "react-query";
import { getDaysDiff } from "../../utils/getDaysDiff";
import useApi from "../../hooks/useApi";
import Modal from "../Modal/Modal";
import styles from "./MentorshipModal.module.css";
var StatusType;
(function (StatusType) {
    StatusType["Accepted"] = "Accepted";
    StatusType["Rejected"] = "Rejected";
})(StatusType || (StatusType = {}));
const MentorshipModal = ({ isOpen, toggle, item, showButtons }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const fetchData = useApi();
    const updateMentorshipStatus = useMutation({
        mutationKey: ["updateMentorship", item?.id],
        mutationFn: async (status) => await fetchData(`/api/mentorship/${item?.id}?status=${status.toString()}`, "patch", true),
        onSuccess: () => {
            queryClient.invalidateQueries("mentorships");
            toggle();
        },
        onError: () => {
            navigate("/");
        },
    });
    return (_jsx(_Fragment, { children: !!item && (_jsx(Modal, { isOpen: isOpen, toggle: toggle, children: _jsxs("div", { className: styles.modalContainer, "data-testid": "mentorshipModal", children: [_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.mentorshipModalItemVer, children: [_jsxs("p", { "data-cy": "modalEmail", children: ["Email: ", item.user.email] }), _jsx("p", { className: styles.mentorshipStatus, children: getDaysDiff(item.createdAt) < 3 ? (_jsx("p", { className: styles.mentorshipStatusText, children: "NEW" })) : (_jsx("span", {})) })] }), _jsxs("div", { className: styles.mentorshipModalItemHor, children: [_jsxs("p", { className: styles.mentorshipModalItemHorText, "data-cy": "modalMessage", children: ["Message: ", item.message] }), _jsxs("p", { className: styles.mentorshipModalItemHorText, "data-cy": "modalExpectations", children: ["Expectations: ", item.expectations] }), _jsxs("p", { className: styles.mentorshipModalItemHorText, "data-cy": "modalBackground", children: ["Background: ", item.background] })] })] }), _jsx("div", { className: styles.modalButtons, "data-testid": "modalButtons", children: item && showButtons && (_jsxs(_Fragment, { children: [_jsx("button", { className: `${styles.modalButton} ${styles.modalRejectButton}`, onClick: () => updateMentorshipStatus.mutate(StatusType.Rejected), children: "DENY" }), _jsx("button", { className: `${styles.modalButton} ${styles.modalAcceptButton}`, onClick: () => updateMentorshipStatus.mutate(StatusType.Accepted), children: "ACCEPT" })] })) })] }) })) }));
};
export default MentorshipModal;
