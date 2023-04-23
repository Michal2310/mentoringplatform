import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom";
import { sortByDate } from "../../utils/sortByDate";
import { getDaysDiff } from "../../utils/getDaysDiff";
import useModal from "../../hooks/useModal";
import MentorshipModal from "../MentorshipModal/MentorshipModal";
import styles from "./UserMentorships.module.css";
const UserMentorships = ({ data, header, showMoreParam, showButtons }) => {
    const [selectedItem, setSelectedItem] = useState();
    const { isOpen, toggle } = useModal();
    const mentorships = data?.data;
    const sortedData = mentorships?.length > 0
        ? mentorships.filter((el) => el.status === "Pending").sort(sortByDate)
        : [];
    return (_jsxs("div", { className: styles.mentorshipsContainer, "data-testid": "mentorships", children: [_jsx("h2", { children: header }), _jsx("div", { className: styles.mentorshipsContainerItem, children: data.isLoading ? (_jsx("p", { children: "Loading" })) : mentorships.length > 0 ? (sortedData.map((el) => (_jsxs("div", { className: styles.mentorshipContainer, "data-testid": "mentorship", children: [_jsxs("div", { className: styles.mentorshipInfo, children: [_jsxs("p", { className: styles.mentorshipInfoParagraph, "data-cy": "email", children: ["Email: ", el.user.email ?? ""] }), _jsxs("p", { className: styles.mentorshipInfoParagraph, "data-cy": "message", children: ["Message: ", el.message] })] }), _jsxs("div", { className: styles.mentorshipButtons, children: [getDaysDiff(el.createdAt) < 3 ? (_jsx("p", { className: styles.mentorshipStatus, children: "NEW" })) : (_jsx("span", {})), _jsx("button", { className: styles.mentorshipButton, onClick: () => {
                                        setSelectedItem(el);
                                        toggle();
                                    }, "data-cy": "modalButton", children: "Show full request" })] })] }, el.message)))) : (_jsx("h3", { children: "Not found any mentorships" })) }), mentorships.length > 0 && (_jsx("div", { className: styles.mentorshipLinkBox, children: _jsx(Link, { className: styles.mentorshipLink, to: `/account/mentorships/${showMoreParam}`, children: "Check more mentorships" }) })), _jsx(MentorshipModal, { isOpen: isOpen, toggle: toggle, item: selectedItem, queryKey: "receivedMentorships", showButtons: showButtons })] }));
};
export default UserMentorships;
