import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import useModal from "../../hooks/useModal";
import MentorshipModal from "../MentorshipModal/MentorshipModal";
import styles from "./Mentorships.module.css";
const Mentorships = ({ data, isLoading, header }) => {
    const { toggle, isOpen } = useModal();
    const [selectedItem, setSelectedItem] = useState();
    const showButtons = header === "Mentorship requests" && selectedItem?.status === "Pending";
    return (_jsx(_Fragment, { children: !isLoading && (_jsxs("div", { className: styles.mentorshipsContainer, "data-testid": "mentorships", children: [_jsx("h2", { children: header }), data.map((el) => (_jsxs("div", { className: styles.mentorshipsItem, children: [_jsxs("div", { className: styles.mentorshipsItemInformation, children: [_jsxs("p", { className: styles.mentorshipsItemInformationText, "data-cy": "email", children: ["Email: ", el.user.email ?? ""] }), _jsxs("p", { className: styles.mentorshipsItemInformationText, "data-cy": "message", children: ["Message: ", el.message] })] }), _jsxs("div", { className: styles.mentorshipsItemButtons, children: [_jsx("p", { "data-cy": "status", className: `
                  ${styles.mentorshipsItemStatusText}
                  ${el.status === "Accepted"
                                        ? styles.statusAccepted
                                        : el.status === "Pending"
                                            ? styles.statusPending
                                            : styles.statusRejected}`, children: el.status }), _jsx("button", { className: styles.mentorshipsItemButton, onClick: () => {
                                        setSelectedItem(el);
                                        toggle();
                                    }, "data-cy": "showModal", children: "Show full request" })] })] }, el.message))), _jsx(MentorshipModal, { isOpen: isOpen, toggle: toggle, item: selectedItem, queryKey: "receivedMentorships", showButtons: showButtons })] })) }));
};
export default Mentorships;
