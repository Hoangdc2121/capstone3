import AppButton from "@/common/AppButton";
import { notifySuccess } from "@/utils/notification";
import { updateProfileSchema } from "@/validations/authValidation";
import useAuthStore from "@/zustand/authStore";
import { Form, Input, Radio } from "antd";
import { useFormik } from "formik";

export default function ProfileInfoForm({ user }) {
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const loading = useAuthStore((state) => state.updateProfileLoading);
  const error = useAuthStore((state) => state.updateProfileError);
  const clearError = useAuthStore((state) => state.clearUpdateProfileError);

  const formik = useFormik({
    initialValues: {
      name: user.name || "",
      phone: user.phone || "",
      gender: user.gender,
    },
    enableReinitialize: true,
    validationSchema: updateProfileSchema,

    onSubmit: async (values) => {
      if (loading) return;

      const normalizedValues = {
        ...values,
        name: values.name.trim(),
        phone: values.phone.trim(),
      };

      try {
        const result = await updateProfile(normalizedValues);

        if (!result) return;

        formik.resetForm({ values: normalizedValues });
        notifySuccess("Đã cập nhật thông tin cá nhân.");
      } catch {}
    },
  });

  const handleChange = (event) => {
    formik.handleChange(event);
    if (error) clearError();
  };

  const handleReset = () => {
    formik.resetForm();
    clearError();
  };

  const getFieldError = (field) =>
    formik.touched[field] ? formik.errors[field] : undefined;

  const busy = loading || formik.isSubmitting;

  return (
    <section
      aria-labelledby="profile-info-title"
      className="rounded-2xl border border-border bg-surface p-5 sm:p-6"
    >
      <h2
        id="profile-info-title"
        className="font-heading text-3xl uppercase text-foreground"
      >
        Thông tin cá nhân
      </h2>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Cập nhật thông tin cơ bản của bạn.
      </p>

      <Form
        layout="vertical"
        requiredMark={false}
        disabled={busy}
        onFinish={formik.handleSubmit}
        className="mt-5 border-t border-border pt-6"
      >
        <div className="grid gap-x-5 sm:grid-cols-2">
          <Form.Item
            label={
              <label htmlFor="profile-name">
                Họ và tên <span className="text-destructive">*</span>
              </label>
            }
            validateStatus={getFieldError("name") ? "error" : undefined}
            help={getFieldError("name")}
          >
            <Input
              id="profile-name"
              name="name"
              size="large"
              value={formik.values.name}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              autoComplete="name"
              placeholder="Nhập họ và tên"
              aria-invalid={Boolean(getFieldError("name"))}
            />
          </Form.Item>

          <Form.Item
            label={<label htmlFor="profile-email">Địa chỉ email</label>}
            extra={
              <span className="text-xs text-muted-foreground">
                Email dùng để đăng nhập.
              </span>
            }
          >
            <Input
              id="profile-email"
              size="large"
              value={user.email || ""}
              readOnly
              autoComplete="email"
              className="bg-secondary!"
            />
          </Form.Item>

          <Form.Item
            label={
              <label htmlFor="profile-phone">
                Số điện thoại <span className="text-destructive">*</span>
              </label>
            }
            validateStatus={getFieldError("phone") ? "error" : undefined}
            help={getFieldError("phone")}
          >
            <Input
              id="profile-phone"
              name="phone"
              size="large"
              type="tel"
              value={formik.values.phone}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              autoComplete="tel"
              placeholder="Nhập số điện thoại"
              aria-invalid={Boolean(getFieldError("phone"))}
            />
          </Form.Item>

          <Form.Item
            label={<span id="profile-gender-label">Giới tính</span>}
            validateStatus={getFieldError("gender") ? "error" : undefined}
            help={getFieldError("gender")}
          >
            <Radio.Group
              name="gender"
              aria-labelledby="profile-gender-label"
              value={formik.values.gender}
              onChange={handleChange}
              onBlur={() => formik.setFieldTouched("gender", true)}
              optionType="button"
              buttonStyle="solid"
              size="large"
              className="flex"
              options={[
                {
                  label: "Nam",
                  value: true,
                  className: "flex-1 text-center",
                },
                {
                  label: "Nữ",
                  value: false,
                  className: "flex-1 text-center",
                },
              ]}
            />
          </Form.Item>
        </div>

        {error && (
          <p
            role="alert"
            className="mb-5 rounded-xl bg-destructive/10 p-3 text-sm leading-6 text-destructive"
          >
            {error}
          </p>
        )}

        <div className="mt-2 flex flex-wrap justify-end gap-3 border-t border-border pt-5">
          <AppButton
            type="default"
            disabled={!formik.dirty || busy}
            onClick={handleReset}
            className="normal-case!"
          >
            Hoàn tác
          </AppButton>

          <AppButton
            htmlType="submit"
            loading={busy}
            disabled={!formik.dirty || busy}
            className="normal-case!"
          >
            {busy ? "Đang lưu..." : "Lưu thay đổi"}
          </AppButton>
        </div>
      </Form>
    </section>
  );
}
