import { cn } from "@/lib/utils";
import { Button } from "antd";

export default function AppButton({
  children,
  type = "primary",
  size = "large",
  htmlType = "button",
  loading = false,
  className,
  ...props
}) {
  // # Button Ant Design dùng chung
  return (
    <Button
      type={type}
      size={size}
      htmlType={htmlType}
      loading={loading}
      className={cn("app-button", className)}
      {...props}
    >
      {children}
    </Button>
  );
}
