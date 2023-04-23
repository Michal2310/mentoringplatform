import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../../context/authContext";
import styles from "./Login.module.css";
import useApi from "../../hooks/useApi";
import FormError from "../../components/FormError/FormError";
import image from "../../assets/login-image.png";
const Login = () => {
    const { setUser, setToken } = useContext(AuthContext);
    const fetchData = useApi();
    const navigation = useNavigate();
    const schema = z
        .object({
        email: z.string().email(),
        password: z.string(),
    })
        .refine(({ password }) => password.trim().length >= 6, {
        message: "The password must be longer than 6 characters",
        path: ["password"],
    });
    const { register, handleSubmit, formState: { errors }, setError, } = useForm({
        resolver: zodResolver(schema),
    });
    const { mutateAsync } = useMutation({
        mutationKey: ["user"],
        mutationFn: async ({ email, password }) => fetchData("/api/auth/login", "post", false, {
            data: {
                email,
                password,
            },
        }),
    });
    const onSubmit = async (formData) => {
        await mutateAsync(formData).then((result) => {
            if (!result.tokens || !result.user) {
                setError("email", {
                    message: "Email not found",
                });
                setError("password", {
                    message: "Password is not correct",
                });
            }
            else {
                setUser(result.user);
                setToken(result.tokens);
                navigation("/");
            }
        });
    };
    return (_jsxs("div", { className: styles.loginContainer, children: [_jsxs("div", { className: styles.loginImageContainer, children: [_jsx("img", { className: styles.loginImage, src: image, alt: "" }), _jsx("h2", { className: styles.loginImageHeader, children: "Lorem ipsum dolor sit amet" }), _jsx("p", { children: "Quisque finibus lorem at est auctor ullamcorper. Curabitur leo arcu, malesuada ac ornare vel, sodales at orci." })] }), _jsxs("div", { className: styles.loginFormContainer, children: [_jsxs("div", { className: styles.loginFormContainerText, children: [_jsx("h1", { children: "Hello Again" }), _jsx("p", { className: styles.loginFormContainerTextParagraph, children: "Welcome back you've been missed" })] }), _jsx("div", { children: _jsxs("form", { action: "", onSubmit: handleSubmit(onSubmit), className: styles.loginForm, children: [_jsxs("div", { className: styles.loginFormItem, children: [_jsx("input", { type: "email", placeholder: "Enter e-mail address", ...register("email", {
                                                required: "Please enter a valid email address",
                                            }), className: `${styles.loginFormInput} ${styles.login__form__input} ${errors.email || errors.root ? styles.inputError : ""}` }), _jsx(FormError, { errors: errors, errorKey: "email" })] }), _jsxs("div", { className: styles.loginFormItem, children: [_jsx("input", { type: "password", placeholder: "Enter password", ...register("password", {
                                                required: "Please enter a password",
                                            }), className: `${styles.loginFormInput} ${styles.login__form__input} ${errors.email || errors.root ? styles.inputError : ""}` }), _jsx(FormError, { errors: errors, errorKey: "password" })] }), _jsx("div", { className: styles.loginRecoveryBox, children: _jsx(Link, { className: styles.loginRecoveryLink, to: "/recovery", children: "Recovery password" }) }), _jsx("input", { className: styles.loginFormSubmit, type: "submit", value: "Login" })] }) }), _jsx("div", { className: styles.login__submit, children: _jsx("div", { className: styles.loginRegisterBox, children: _jsxs("p", { children: ["Not a member?", _jsx(Link, { to: "/register", className: styles.loginRegisterLink, children: "Register now" })] }) }) })] })] }));
};
export default Login;
