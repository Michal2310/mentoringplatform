import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ConstructionIcon from "@mui/icons-material/Construction";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import StarIcon from "@mui/icons-material/Star";
import styles from "./Mentor.module.css";
import useFavoriteMentor from "../../hooks/useFavoriteMentor";
import { AuthContext } from "../../context/authContext";
const Mentor = ({ data }) => {
    const { user } = useContext(AuthContext);
    const addFavoriteMentor = useFavoriteMentor(user.id);
    const [starState, setStarState] = useState(() => {
        const initialState = {};
        data?.forEach((el) => {
            initialState[el.user.email] = el.favoriteMentors.some((favoriteMentor) => favoriteMentor.userId === user.id);
        });
        return initialState;
    });
    const toggleStar = (email) => {
        setStarState((prevState) => ({
            ...prevState,
            [email]: !prevState[email],
        }));
    };
    const handleAddFavoriteMentor = async (mentorId) => {
        if (!user?.id)
            return;
        try {
            await addFavoriteMentor(mentorId);
        }
        catch (error) {
            console.error(error);
        }
    };
    return (_jsx("div", { className: styles.mentorContainer, children: data?.map((el) => (_jsxs("div", { className: styles.mentorContainerItem, "data-testid": "mentor", children: [_jsxs("div", { className: styles.mentorItemProfile, children: [_jsxs("div", { className: styles.mentorItemProfileInformation, children: [_jsx(LocationOnIcon, {}), _jsx("p", { "data-cy": "country", className: styles.textCapitalize, children: el.user.country[0].country })] }), _jsx("img", { className: styles.mentor__profile__image, src: el.user.image[0].fileUrl }), _jsx("button", { className: styles.starButton, "data-testid": "starButton", onClick: () => {
                                toggleStar(el.user.email);
                                handleAddFavoriteMentor(el.user.id);
                            }, children: starState[el.user.email] ? _jsx(StarIcon, {}) : _jsx(StarBorderIcon, {}) })] }), _jsxs(_Fragment, { children: [_jsxs("div", { className: styles.mentorItemProfileInformation, children: [_jsx(PermIdentityIcon, {}), _jsx("p", { className: styles.mentorItemProfileInformationText, "data-cy": "firstname", children: el.user.firstname })] }), _jsxs("div", { className: styles.mentorItemProfileInformation, children: [_jsx(InfoIcon, {}), _jsxs("p", { className: styles.mentorItemProfileInformationText, "data-cy": "about", children: ["Bio: ", el.user.about] })] }), _jsxs("div", { className: styles.mentorItemProfileInformation, children: [_jsx(ConstructionIcon, {}), _jsx("p", { className: `${styles.mentorItemProfileInformationText} ${styles.textCapitalize}`, "data-cy": "skills", children: el?.user?.skills.map((el) => el.skill).join(", ") })] })] }), _jsx("div", { className: styles.mentorButton, children: _jsx(Link, { to: `/mentor/${el.user.id}`, className: styles.mentorButtonLink, "data-testid": "link", children: "Show full profile" }) })] }, el.user.email))) }));
};
export default Mentor;
