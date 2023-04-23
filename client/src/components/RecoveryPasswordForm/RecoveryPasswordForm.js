import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./RecoveryPasswordForm.module.css";
import FormError from "../FormError/FormError";
import RecoveryInfo from "../RecoveryInfo/RecoveryInfo";
import useApi from "../../hooks/useApi";
const RecoveryPasswordForm = ({ code }) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const schema = z
        .object({
        email: z.string().email(),
        password: z.string(),
        confirmPassword: z.string(),
    })
        .refine(({ password }) => password.trim().length >= 6, {
        message: "The password must be longer than 6 characters",
        path: ["password"],
    })
        .refine(({ confirmPassword }) => confirmPassword.trim().length >= 6, {
        message: "The password must be longer than 6 characters",
        path: ["confirmPassword"],
    })
        .refine(({ password, confirmPassword }) => password === confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
    const { register, handleSubmit, formState: { errors }, setError, } = useForm({
        resolver: zodResolver(schema),
    });
    const fetchData = useApi();
    const { mutateAsync } = useMutation({
        mutationKey: ["user"],
        mutationFn: async (FormData) => fetchData(`/api/auth/recoverypassword?code=${code}`, "post", false, {
            data: {
                email: FormData.email,
                password: FormData.password,
            },
        }),
        onSuccess: () => {
            setIsSuccess(true);
        },
        onError: () => {
            setError("email", {
                message: "Invalid email",
            });
        },
    });
    const onSubmit = async (FormData) => await mutateAsync(FormData);
    return (_jsx(_Fragment, { children: isSuccess ? (_jsx(RecoveryInfo, { header: "New password confirmed successful", text: "You have successfully confirm your new password. Please, use your new password when logging in." })) : (_jsx(_Fragment, { children: _jsx("div", { className: styles.recoveryContainer, "data-testid": "passwordReset", children: _jsxs("div", { className: styles.recoveryContainerItem, children: [_jsx("div", { className: styles.recoveryItemBox, children: _jsx("h1", { children: "Please, enter a new password bellow!" }) }), _jsx("div", { children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), "data-testid": "passwordResetForm", className: styles.recoveryForm, children: [_jsxs("div", { className: styles.recoveryFormInputBox, children: [_jsx("input", { type: "email", placeholder: "Enter e-mail address", ...register("email", {
                                                    required: "Please enter a valid email address",
                                                }), className: `${styles.recoveryFormInput} ${errors.email || errors.root ? styles.inputError : ""}`, "data-cy-input": "email" }), _jsx(FormError, { errors: errors, errorKey: "email" })] }), _jsxs("div", { className: styles.recoveryFormInputBox, children: [_jsx("input", { type: "password", placeholder: "Enter password", ...register("password", { required: "Please enter a password" }), className: `${styles.recoveryFormInput} ${errors.password || errors.root ? styles.inputError : ""}`, "data-cy-input": "password" }), _jsx(FormError, { errors: errors, errorKey: "password" })] }), _jsxs("div", { className: styles.recoveryFormInputBox, children: [_jsx("input", { type: "password", placeholder: "Confirm password", ...register("confirmPassword", { required: "Please enter a password" }), className: `${styles.recoveryFormInput} ${errors.confirmPassword || errors.root ? styles.inputError : ""}`, "data-cy-input": "submitPassword" }), _jsx(FormError, { errors: errors, errorKey: "confirmPassword" })] }), _jsx("input", { className: styles.submitForm, type: "submit", value: "Reset password" })] }) })] }) }) })) }));
};
export default RecoveryPasswordForm;
