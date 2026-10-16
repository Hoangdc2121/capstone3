import { cn } from "@/lib/utils";

export default function Container({ children, className, ...props }) {
  // # Giới hạn chiều rộng, căn giữa nội dung
  return (
    <div
      {...props}
      className={cn("mx-auto w-full max-w-7xl px-4 sm-px-6 lg:px-8", className)}
    >
      {children}
    </div>
  );
}
