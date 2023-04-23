import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./ChangeInfoForm.module.css";
import FormError from "../FormError/FormError";
const ChangeInfoForm = ({ children, onSubmit, header }) => {
    const schema = z
        .object({
        firstname: z.string(),
        lastname: z.string(),
        about: z.string(),
        title: z.string(),
    })
        .refine(({ firstname }) => firstname.trim().length >= 1, {
        message: "The firstname cannot be empty",
        path: ["firstname"],
    })
        .refine(({ lastname }) => lastname.trim().length >= 1, {
        message: "The lastname cannot be empty",
        path: ["lastname"],
    })
        .refine(({ title }) => title.trim().length >= 1, {
        message: "The title cannot be empty",
        path: ["title"],
    })
        .refine(({ about }) => about.trim().length >= 1, {
        message: "The about cannot be empty",
        path: ["about"],
    });
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(schema),
    });
    return (_jsxs("div", { className: styles.infoContainer, children: [_jsx("h2", { children: header }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsxs("div", { className: styles.formItem, children: [_jsx("label", { htmlFor: "firstname", className: styles.label, children: "Firstname" }), _jsx("input", { "data-cy-input": "firstname", id: "firstname", type: "text", className: `${errors.firstname || errors.root ? styles.inputError : ""}`, ...register("firstname") }), _jsx(FormError, { errors: errors, errorKey: "firstname" })] }), _jsxs("div", { className: styles.formItem, children: [_jsx("label", { htmlFor: "lastname", className: styles.label, children: "Lastname" }), _jsx("input", { "data-cy-input": "lastname", id: "lastname", type: "text", className: `${errors.lastname || errors.root ? styles.inputError : ""}`, ...register("lastname") }), _jsx(FormError, { errors: errors, errorKey: "lastname" })] }), _jsxs("div", { "data-cy": "errordiv", className: styles.formItem, children: [_jsx("label", { htmlFor: "title", className: styles.label, children: "Title" }), _jsx("input", { "data-cy-input": "title", id: "title", type: "text", className: `${errors.title || errors.root ? styles.inputError : ""}`, ...register("title") }), _jsx(FormError, { errors: errors, errorKey: "title" })] }), _jsxs("div", { className: styles.formItem, children: [_jsx("label", { htmlFor: "about", className: styles.label, children: "About" }), _jsx("textarea", { "data-cy-input": "about", id: "about", className: `${errors.about || errors.root ? styles.inputError : ""}`, ...register("about") }), _jsx(FormError, { errors: errors, errorKey: "about" })] }), children, _jsx("input", { type: "submit", className: styles.formSubmit, value: "Update" })] })] }));
};
export default ChangeInfoForm;
