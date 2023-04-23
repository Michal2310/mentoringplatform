import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "../FormError/FormError";
import styles from "./RecoveryPasswordLink.module.css";
import useApi from "../../hooks/useApi";
import RecoveryInfo from "../RecoveryInfo/RecoveryInfo";
const RecoveryPasswordLink = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const fetchData = useApi();
    const schema = z.object({
        email: z.string().email(),
    });
    const { register, handleSubmit, formState: { errors }, setError, } = useForm({
        resolver: zodResolver(schema),
    });
    const { mutateAsync } = useMutation({
        mutationKey: ["recovery"],
        mutationFn: async (FormData) => fetchData(`/api/auth/recoverylink?email=${FormData.email}`, "post", false),
        onSuccess: () => {
            setIsSuccess(true);
        },
        onError: () => {
            setError("email", {
                message: "Invalid email",
            });
        },
    });
    const onSubmit = (FormData) => mutateAsync(FormData);
    return (_jsx(_Fragment, { children: isSuccess ? (_jsx(RecoveryInfo, { header: "Password reset email\r\n      has been sent", text: "A password reset email has been sent to your e-mail address." })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.recoveryText, children: [_jsx("h1", { children: "Forgot your password?" }), _jsx("p", { className: styles.recoveryTextParagraph, children: "Please enter your e-mail address bellow to receive your user and a new password" })] }), _jsx("div", { children: _jsxs("form", { action: "", onSubmit: handleSubmit(onSubmit), className: styles.recoveryForm, children: [_jsxs("div", { className: styles.recoveryFormContainer, children: [_jsx("input", { type: "email", placeholder: "Enter e-mail address", ...register("email", {
                                            required: "Please enter a valid email address",
                                        }), className: `${styles.recoveryFormInput} ${errors.email || errors.root ? styles.inputError : ""}` }), _jsx(FormError, { errors: errors, errorKey: "email" })] }), _jsx("input", { className: styles.recoverySubmit, type: "submit", value: "Reset password" })] }) })] })) }));
};
export default RecoveryPasswordLink;
