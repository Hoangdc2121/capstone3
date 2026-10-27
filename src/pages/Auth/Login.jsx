import AppButton from "@/common/AppButton";
import FloatingInput from "@/common/FloatingInput";
import { notifySuccess } from "@/utils/notification";
import { loginSchema } from "@/validations/authValidation";
import useAuthStore from "@/zustand/authStore";
import { useFormik } from "formik";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const signIn = useAuthStore((state) => state.signIn);
  const signInLoading = useAuthStore((state) => state.signInLoading);
  // const signInError = useAuthStore((state) => state.signInError);
  const clearAuthErrors = useAuthStore((state) => state.clearAuthErrors);

  useEffect(() => {
    clearAuthErrors();
  }, [clearAuthErrors]);

  const formLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: loginSchema,

    onSubmit: async (values) => {
      try {
        const result = await signIn({
          email: values.email.trim(),
          password: values.password,
        });

        notifySuccess(result.message || "Đăng nhập thành công!");
        navigate("/", { replace: true });
      } catch {}
    },
  });

  const emailError = formLogin.touched.email && formLogin.errors.email;
  const passwordError = formLogin.touched.password && formLogin.errors.password;

  return (
    <section aria-labelledby="login-title">
      <h1
        id="login-title"
        className="font-heading text-4xl uppercase leading-tight text-foreground sm:text-5xl"
      >
        Chào mừng trở lại
      </h1>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Đăng nhập để tiếp tục hành trình sneaker của bạn.
      </p>

      <form
        onSubmit={formLogin.handleSubmit}
        noValidate
        aria-busy={signInLoading || formLogin.isSubmitting}
        className="mt-8 space-y-5"
      >
        <FloatingInput
          id="login-email"
          name="email"
          label="Địa chỉ email"
          type="email"
          autoComplete="username"
          value={formLogin.values.email}
          onChange={formLogin.handleChange}
          onBlur={formLogin.handleBlur}
          error={emailError}
        />

        <FloatingInput
          id="login-password"
          name="password"
          label="Mật khẩu"
          type="password"
          autoComplete="current-password"
          value={formLogin.values.password}
          onChange={formLogin.handleChange}
          onBlur={formLogin.handleBlur}
          error={passwordError}
        />

        <AppButton
          htmlType="submit"
          loading={signInLoading || formLogin.isSubmitting}
          className="w-full"
        >
          {signInLoading || formLogin.isSubmitting
            ? "Đang đăng nhập..."
            : "Đăng nhập"}
        </AppButton>
      </form>

      <div className="mt-8 border-t border-border pt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="font-semibold text-primary transition-colors hover:underline"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </section>
  );
}
