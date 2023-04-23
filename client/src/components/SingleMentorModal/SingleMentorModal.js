import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useApi from "../../hooks/useApi";
import Modal from "../Modal/Modal";
import styles from "./SingleMentorModal.module.css";
import FormError from "../FormError/FormError";
const SingleMentorModal = ({ mentorId, isOpen, toggle }) => {
    const fetchData = useApi();
    const schema = z
        .object({
        background: z.string(),
        expectations: z.string(),
        message: z.string(),
    })
        .refine(({ background }) => background.trim().length > 0, {
        message: "Background field cannot be empty",
        path: ["background"],
    })
        .refine(({ expectations }) => expectations.trim().length > 0, {
        message: "Expectations field cannot be empty",
        path: ["expectations"],
    })
        .refine(({ message }) => message.trim().length > 0, {
        message: "Message field cannot be empty",
        path: ["message"],
    });
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(schema),
    });
    const { mutateAsync } = useMutation({
        mutationKey: ["user"],
        mutationFn: async ({ background, expectations, message }) => fetchData(`/api/mentorship/${mentorId}`, "post", true, {
            data: {
                background,
                expectations,
                message,
            },
        }),
    });
    const onSubmit = async (formData) => {
        await mutateAsync(formData).then((result) => {
            toggle();
        });
    };
    return (_jsx(Modal, { isOpen: isOpen, toggle: toggle, children: _jsxs("form", { action: "", onSubmit: handleSubmit(onSubmit), className: styles.mentorForm, children: [_jsxs("div", { className: styles.mentorFormItem, children: [_jsx("label", { htmlFor: "background", className: styles.mentorFormItemLabel, children: "Background" }), _jsx("textarea", { "data-cy-input": "background", id: "background", className: `${styles.mentorFormItemTextarea}${errors.background || errors.root ? styles.inputError : ""}`, ...register("background") }), _jsx(FormError, { errors: errors, errorKey: "background" })] }), _jsxs("div", { className: styles.mentorFormItem, children: [_jsx("label", { htmlFor: "expectations", className: styles.mentorFormItemLabel, children: "Expectations" }), _jsx("textarea", { className: `${styles.mentorFormItemTextarea}${errors.expectations || errors.root ? styles.inputError : ""}`, "data-cy-input": "expectations", id: "expectations", ...register("expectations") }), _jsx(FormError, { errors: errors, errorKey: "expectations" })] }), _jsxs("div", { className: styles.mentorFormItem, children: [_jsx("label", { htmlFor: "message", className: styles.mentorFormItemLabel, children: "Message" }), _jsx("textarea", { "data-cy-input": "message", id: "message", className: `${styles.mentorFormItemTextarea}${errors.message || errors.root ? styles.inputError : ""}`, ...register("message") }), _jsx(FormError, { errors: errors, errorKey: "message" })] }), _jsx("input", { className: styles.mentorFormSubmit, type: "submit", value: "Send" })] }) }));
};
export default SingleMentorModal;
