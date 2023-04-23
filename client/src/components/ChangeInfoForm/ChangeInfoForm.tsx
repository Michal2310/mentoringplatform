import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "../../hooks/useAccoutUpdate";
import styles from "./ChangeInfoForm.module.css";
import FormError from "../FormError/FormError";

interface ChangePersonalInfoProps {
  header: string;
  children: ReactNode;
  onSubmit: (FormData: FormData) => void;
}

const ChangeInfoForm = ({ children, onSubmit, header }: ChangePersonalInfoProps) => {
  const schema: ZodType<FormData> = z
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <div className={styles.infoContainer}>
      <h2>{header}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formItem}>
          <label htmlFor="firstname" className={styles.label}>
            Firstname
          </label>
          <input
            data-cy-input="firstname"
            id="firstname"
            type="text"
            className={`${errors.firstname || errors.root ? styles.inputError : ""}`}
            {...register("firstname")}
          />
          <FormError<FormData> errors={errors} errorKey={"firstname"} />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="lastname" className={styles.label}>
            Lastname
          </label>
          <input
            data-cy-input="lastname"
            id="lastname"
            type="text"
            className={`${errors.lastname || errors.root ? styles.inputError : ""}`}
            {...register("lastname")}
          />
          <FormError<FormData> errors={errors} errorKey={"lastname"} />
        </div>
        <div data-cy="errordiv" className={styles.formItem}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            data-cy-input="title"
            id="title"
            type="text"
            className={`${errors.title || errors.root ? styles.inputError : ""}`}
            {...register("title")}
          />
          <FormError<FormData> errors={errors} errorKey={"title"} />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="about" className={styles.label}>
            About
          </label>
          <textarea
            data-cy-input="about"
            id="about"
            className={`${errors.about || errors.root ? styles.inputError : ""}`}
            {...register("about")}
          />
          <FormError<FormData> errors={errors} errorKey={"about"} />
        </div>
        {children}
        <input type="submit" className={styles.formSubmit} value={"Update"} />
      </form>
    </div>
  );
};

export default ChangeInfoForm;
