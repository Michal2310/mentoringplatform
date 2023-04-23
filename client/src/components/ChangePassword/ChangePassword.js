import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "../FormError/FormError";
import styles from "./ChangePassword.module.css";
import useApi from "../../hooks/useApi";
const ChangePassword = () => {
    const fetchData = useApi();
    const navigate = useNavigate();
    const schema = z
        .object({
        currentPassword: z.string(),
        newPassword: z.string(),
    })
        .refine(({ currentPassword }) => currentPassword.trim().length >= 6, {
        message: "The current password field must be longer than 6 characters",
        path: ["currentPassword"],
    })
        .refine(({ newPassword }) => newPassword.trim().length >= 6, {
        message: "The new password field must be longer than 6 characters",
        path: ["newPassword"],
    });
    const { register, formState: { errors }, handleSubmit, setError, } = useForm({
        resolver: zodResolver(schema),
    });
    const { mutateAsync } = useMutation({
        mutationKey: ["changePassword"],
        mutationFn: async ({ currentPassword, newPassword }) => fetchData("/api/account/", "put", true, {
            data: {
                newPassword,
                oldPassword: currentPassword,
            },
        }),
        onSuccess: () => {
            navigate("/account");
        },
        onError: () => {
            alert("Incorrect password. Please try again.");
        },
    });
    const onSubmit = async (FormData) => {
        try {
            const res = await mutateAsync(FormData);
        }
        catch (error) {
            setError("currentPassword", {
                message: "Incorrect password. Please try again.",
            });
        }
    };
    return (_jsxs("div", { className: styles.infoContainer, "data-testid": "changePassword", children: [_jsx("h2", { children: "Change your current password" }), _jsxs("form", { action: "", onSubmit: handleSubmit(onSubmit), id: "form", children: [_jsxs("div", { className: styles.formItem, children: [_jsx("label", { htmlFor: "currentPassword", className: styles.label, children: "Current password" }), _jsx("input", { id: "currentPassword", type: "text", className: `${styles.input} ${errors.currentPassword || errors.root ? styles.inputError : ""}`, ...register("currentPassword"), "data-cy-input": "currentPassword" }), _jsx(FormError, { errors: errors, errorKey: "currentPassword" })] }), _jsxs("div", { className: styles.formItem, children: [_jsx("label", { htmlFor: "newPassword", className: styles.label, children: "New password" }), _jsx("input", { id: "newPassword", type: "text", className: `${styles.input} ${errors.newPassword || errors.root ? styles.inputError : ""}`, ...register("newPassword"), "data-cy-input": "newPassword" }), _jsx(FormError, { errors: errors, errorKey: "newPassword" })] }), _jsx("input", { type: "submit", className: styles.fromSubmit, value: "Change password" })] })] }));
};
export default ChangePassword;
