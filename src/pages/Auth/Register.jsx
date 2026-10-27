import { useEffect } from "react";
import { useFormik } from "formik";
import { Radio } from "antd";
import { Link, useNavigate } from "react-router-dom";

import AppButton from "@/common/AppButton";
import FloatingInput from "@/common/FloatingInput";
import { notifySuccess } from "@/utils/notification";
import { registerSchema } from "@/validations/authValidation";
import useAuthStore from "@/zustand/authStore";

export default function Register() {
  const navigate = useNavigate();

  const signUp = useAuthStore((state) => state.signUp);
  const signUpLoading = useAuthStore((state) => state.signUpLoading);
  const clearAuthErrors = useAuthStore((state) => state.clearAuthErrors);

  useEffect(() => {
    clearAuthErrors();
  }, [clearAuthErrors]);

  const formRegister = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      gender: null,
      password: "",
      confirmPassword: "",
    },

    validationSchema: registerSchema,

    onSubmit: async (values) => {
      try {
        const result = await signUp({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          gender: values.gender,
          password: values.password,
        });

        notifySuccess(result.message || "Đăng ký thành công!");
        navigate("/login", { replace: true });
      } catch {}
    },
  });

  const getFieldError = (name) =>
    formRegister.touched[name] && formRegister.errors[name];

  const fields = [
    {
      name: "name",
      label: "Họ và tên",
      type: "text",
      autoComplete: "name",
    },
    {
      name: "email",
      label: "Địa chỉ email",
      type: "email",
      autoComplete: "email",
    },
    {
      name: "phone",
      label: "Số điện thoại",
      type: "tel",
      autoComplete: "tel",
    },
    {
      name: "password",
      label: "Mật khẩu",
      type: "password",
      autoComplete: "new-password",
    },
    {
      name: "confirmPassword",
      label: "Xác nhận mật khẩu",
      type: "password",
      autoComplete: "new-password",
    },
  ];

  const genderError = getFieldError("gender");
  return (
    <section aria-labelledby="register-title">
      <h1
        id="register-title"
        className="font-heading text-4xl uppercase leading-tight text-foreground sm:text-5xl"
      >
        Gia nhập Sneaker Hub
      </h1>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Tạo tài khoản và khám phá những đôi giày dành cho bạn.
      </p>

      <form
        onSubmit={formRegister.handleSubmit}
        noValidate
        aria-busy={signUpLoading || formRegister.isSubmitting}
        className="mt-8 space-y-4"
      >
        <FloatingInput
          id="register-name"
          name="name"
          label="Họ và tên"
          type="text"
          autoComplete="name"
          value={formRegister.values.name}
          onChange={formRegister.handleChange}
          onBlur={formRegister.handleBlur}
          error={getFieldError("name")}
        />
        <FloatingInput
          id="register-email"
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          value={formRegister.values.email}
          onChange={formRegister.handleChange}
          onBlur={formRegister.handleBlur}
          error={getFieldError("email")}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FloatingInput
            id="register-phone"
            name="phone"
            label="Số điện thoại"
            type="tel"
            autoComplete="tel"
            value={formRegister.values.phone}
            onChange={formRegister.handleChange}
            onBlur={formRegister.handleBlur}
            error={getFieldError("phone")}
          />

          <fieldset
            aria-describedby={genderError ? "register-gender-error" : undefined}
          >
            <legend className="sr-only">Giới tính</legend>
            <Radio.Group
              name="gender"
              value={formRegister.values.gender}
              onChange={(event) => {
                formRegister.setFieldValue("gender", event.target.value);
              }}
              onBlur={() => {
                formRegister.setFieldTouched("gender", true);
              }}
              className="flex! h-16! gap-2!"
            >
              <Radio.Button
                value={true}
                className="flex! h-full! flex-1! items-center! justify-center! rounded-xl! border! border-solid! before:hidden!"
              >
                Nam
              </Radio.Button>

              <Radio.Button
                value={false}
                className="flex! h-full! flex-1! items-center! justify-center! rounded-xl! border! border-solid! before:hidden!"
              >
                Nữ
              </Radio.Button>
            </Radio.Group>

            {genderError && (
              <p
                id="register-gender-error"
                className="mt-2 text-xs text-destructive"
              >
                {genderError}
              </p>
            )}
          </fieldset>
        </div>

        <FloatingInput
          id="register-password"
          name="password"
          label="Mật khẩu"
          type="password"
          autoComplete="new-password"
          value={formRegister.values.password}
          onChange={formRegister.handleChange}
          onBlur={formRegister.handleBlur}
          error={getFieldError("password")}
        />

        <FloatingInput
          id="register-confirmPassword"
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          type="password"
          autoComplete="new-password"
          value={formRegister.values.confirmPassword}
          onChange={formRegister.handleChange}
          onBlur={formRegister.handleBlur}
          error={getFieldError("confirmPassword")}
        />

        <AppButton
          htmlType="submit"
          loading={signUpLoading || formRegister.isSubmitting}
          className="w-full"
        >
          {signUpLoading || formRegister.isSubmitting
            ? "Đang tạo tài khoản..."
            : "Tạo tài khoản"}
        </AppButton>
      </form>

      <div className="mt-8 border-t border-border pt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Đã có tài khoản?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary hover:underline"
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    </section>
  );
}
