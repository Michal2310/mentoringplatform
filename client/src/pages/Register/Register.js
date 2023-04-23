import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import useApi from "../../hooks/useApi";
import FormError from "../../components/FormError/FormError";
import image from "../../assets/login-image.png";
const Register = () => {
    const navigation = useNavigate();
    const fetchData = useApi();
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
        path: ["confirmPassword", "password"],
    });
    const { register, handleSubmit, formState: { errors }, setError, } = useForm({
        resolver: zodResolver(schema),
    });
    const { mutateAsync } = useMutation({
        mutationKey: ["user"],
        mutationFn: async ({ email, password }) => fetchData("/api/auth/register", "post", false, {
            data: {
                email,
                password,
            },
        }),
    });
    const onSubmit = async (formData) => {
        await mutateAsync(formData).then((result) => {
            if (!!result.tokens) {
                setError("email", {
                    message: "Email already used",
                });
            }
            else {
                navigation("/login");
            }
        });
    };
    return (_jsxs("div", { className: styles.registerContainer, children: [_jsxs("div", { className: styles.registerImageContainer, children: [_jsx("img", { className: styles.registerImage, src: image, alt: "" }), _jsx("h2", { className: styles.registerImageHeader, children: "Lorem ipsum dolor sit amet" }), _jsx("p", { children: "Quisque finibus lorem at est auctor ullamcorper. Curabitur leo arcu, malesuada ac ornare vel, sodales at orci." })] }), _jsxs("div", { className: styles.registerFormContainer, children: [_jsxs("div", { className: styles.registerFormContainerText, children: [_jsx("h1", { children: "Hello!" }), _jsx("p", { className: styles.registerFormContainerTextParagraph, children: "We hope you will find what you are looking for" })] }), _jsx("div", { children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: styles.registerForm, children: [_jsxs("div", { className: styles.registerFormItem, children: [_jsx("input", { type: "email", placeholder: "Enter e-mail address", ...register("email", {
                                                required: "Please enter a valid email address",
                                            }), className: `${styles.registerFormInput} ${errors.email || errors.root ? styles.inputError : ""}` }), _jsx(FormError, { errors: errors, errorKey: "email" })] }), _jsxs("div", { className: styles.registerFormItem, children: [_jsx("input", { type: "password", placeholder: "Enter password", ...register("password", { required: "Please enter a password" }), className: `${styles.registerFormInput} ${errors.password || errors.root ? styles.inputError : ""}` }), _jsx(FormError, { errors: errors, errorKey: "password" })] }), _jsxs("div", { className: styles.registerFormItem, children: [_jsx("input", { type: "password", placeholder: "Confirm password", ...register("confirmPassword", { required: "Please enter a password" }), className: `${styles.registerFormInput} ${errors.confirmPassword || errors.root ? styles.inputError : ""}` }), _jsx(FormError, { errors: errors, errorKey: "confirmPassword" })] }), _jsx("input", { className: styles.registerFormSubmit, type: "submit", value: "Register now" })] }) }), _jsx("div", { className: styles.loginBox, children: _jsx("div", { className: styles.loginBoxItem, children: _jsxs("p", { children: ["Already a member?", _jsx(Link, { to: "/login", className: styles.loginBoxItemLink, children: "Log in now" })] }) }) })] })] }));
};
export default Register;
