import { useContext } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext, Token, User } from "../../context/authContext";
import styles from "./Login.module.css";
import useApi from "../../hooks/useApi";
import FormError from "../../components/FormError/FormError";
import image from "../../assets/login-image.png";

interface FormData {
  email: string;
  password: string;
}
interface LoginResponse {
  user: User;
  tokens: Token;
}
const Login = () => {
  const { setUser, setToken } = useContext(AuthContext);
  const fetchData = useApi<LoginResponse>();
  const navigation = useNavigate();

  const schema: ZodType<FormData> = z
    .object({
      email: z.string().email(),
      password: z.string(),
    })
    .refine(({ password }) => password.trim().length >= 6, {
      message: "The password must be longer than 6 characters",
      path: ["password"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["user"],
    mutationFn: async ({ email, password }: FormData) =>
      fetchData("/api/auth/login", "post", false, {
        data: {
          email,
          password,
        },
      }),
  });

  const onSubmit = async (formData: FormData) => {
    await mutateAsync(formData).then((result) => {
      if (!result.tokens || !result.user) {
        setError("email", {
          message: "Email not found",
        });
        setError("password", {
          message: "Password is not correct",
        });
      } else {
        setUser(result.user);
        setToken(result.tokens);
        navigation("/");
      }
    });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginImageContainer}>
        <img className={styles.loginImage} src={image} alt="" />
        <h2 className={styles.loginImageHeader}>Lorem ipsum dolor sit amet</h2>
        <p>
          Quisque finibus lorem at est auctor ullamcorper. Curabitur leo arcu, malesuada ac ornare
          vel, sodales at orci.
        </p>
      </div>
      <div className={styles.loginFormContainer}>
        <div className={styles.loginFormContainerText}>
          <h1>Hello Again</h1>
          <p className={styles.loginFormContainerTextParagraph}>Welcome back you've been missed</p>
        </div>
        <div>
          <form action="" onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
            <div className={styles.loginFormItem}>
              <input
                type="email"
                placeholder="Enter e-mail address"
                {...register("email", {
                  required: "Please enter a valid email address",
                })}
                className={`${styles.loginFormInput} ${styles.login__form__input} ${
                  errors.email || errors.root ? styles.inputError : ""
                }`}
              />
              <FormError<FormData> errors={errors} errorKey={"email"} />
            </div>
            <div className={styles.loginFormItem}>
              <input
                type="password"
                placeholder="Enter password"
                {...register("password", {
                  required: "Please enter a password",
                })}
                className={`${styles.loginFormInput} ${styles.login__form__input} ${
                  errors.email || errors.root ? styles.inputError : ""
                }`}
              />
              <FormError<FormData> errors={errors} errorKey={"password"} />
            </div>
            <div className={styles.loginRecoveryBox}>
              <Link className={styles.loginRecoveryLink} to="/recovery">
                Recovery password
              </Link>
            </div>
            <input className={styles.loginFormSubmit} type="submit" value={"Login"} />
          </form>
        </div>
        <div className={styles.login__submit}>
          <div className={styles.loginRegisterBox}>
            <p>
              Not a member?
              <Link to={"/register"} className={styles.loginRegisterLink}>
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
