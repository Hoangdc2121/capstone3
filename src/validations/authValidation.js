import * as Yup from "yup";

// Đăng nhập
export const loginSchema = Yup.object({
  email: Yup.string()
    .trim()
    .required("Vui lòng nhập email.")
    .email("Email không đúng định dạng."),

  password: Yup.string().required("Vui lòng nhập mật khẩu."),
});

// Đăng ký
export const registerSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Vui lòng nhập họ và tên.")
    .min(2, "Họ và tên phải có ít nhất 2 ký tự.")
    .max(100, "Họ và tên không được vượt quá 100 ký tự."),

  email: Yup.string()
    .trim()
    .required("Vui lòng nhập email.")
    .email("Email không đúng định dạng."),

  phone: Yup.string()
    .trim()
    .required("Vui lòng nhập số điện thoại.")
    .matches(
      /^(0|\+84)[35789]\d{8}$/,
      "Vui lòng nhập số điện thoại di động Việt Nam hợp lệ.",
    ),

  gender: Yup.boolean()
    .typeError("Vui lòng chọn giới tính.")
    .required("Vui lòng chọn giới tính."),

  password: Yup.string()
    .required("Vui lòng nhập mật khẩu.")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự.")
    .matches(/[a-z]/, "Mật khẩu phải có chữ thường.")
    .matches(/[A-Z]/, "Mật khẩu phải có chữ hoa.")
    .matches(/\d/, "Mật khẩu phải có số.")
    .matches(/[^A-Za-z0-9\s]/, "Mật khẩu phải có ký tự đặc biệt."),

  confirmPassword: Yup.string()
    .required("Vui lòng xác nhận mật khẩu.")
    .oneOf([Yup.ref("password")], "Mật khẩu xác nhận không khớp."),
});
