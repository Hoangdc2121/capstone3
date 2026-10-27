import Container from "@/common/Container";
import { Clock, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  // # Chân trang dùng chung
  const navigationLinks = [
    { label: "Trang chủ", to: "/" },
    { label: "Khám phá sản phẩm", to: "/shop" },
    { label: "Sản phẩm nổi bật", to: "/shop?feature=true" },
    { label: "Giỏ hàng", to: "/carts" },
    { label: "Tài khoản cá nhân", to: "/login" },
  ];
  return (
    <footer className="mt-10 border-t border-border bg-surface sm:mt-14">
      <Container>
        <div className="grid gap-10 py-10 sm:py-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          <div>
            <Link
              to="/"
              aria-label="SNEAKER HUB — Trang chủ"
              className="group inline-flex shrink-0 items-center gap-3"
            >
              <span
                aria-hidden="true"
                className="flex w-9 h-9 items-center justify-center rounded-xl bg-primary font-heading text-2xl leading-none text-white shadow-md shadow-primary/20 transition-transform ease-in-out duration-150 group-hover:scale-110 group-hover:-translate-y-1"
              >
                S
              </span>

              <span className="font-heading text-3xl leading-none tracking-wide text-foreground transition-colors duration-200 group-hover:text-primary">
                SNEAKER HUB
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
              Nền tảng giám tuyển và cung cấp các phát hành sneaker chính hãng
              nguyên bản, lưu trữ những tuyệt phẩm mang tính biểu tượng của văn
              hóa đường phố toàn cầu.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold uppercase text-primary">
                Verified archive
              </span>

              <span className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-semibold uppercase text-foreground">
                Global shipping
              </span>
            </div>
          </div>

          <div>
            <h2 className="font-heading text-2xl uppercase text-foreground">
              Điều hướng nhanh
            </h2>

            <ul className="mt-5 space-y-3">
              {navigationLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-2xl uppercase text-foreground">
              Hỗ trợ & liên hệ
            </h2>

            <ul className="mt-5 space-y-5 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <Phone
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-primary"
                />
                <span>Hotline CSKH: 1900 0000</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-primary"
                />
                <span className="break-all">Email: contact@sneakerhub.vn</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-primary"
                />
                <span>Giờ làm việc: 09:00 – 21:00 (Hằng ngày)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border py-6 text-xs uppercase tracking-wide sm:flex-row sm:items-center sm:justify-between">
          <p className="leading-6 text-muted-foreground">
            © {new Date().getFullYear()} SNEAKER HUB. Tất cả quyền được bảo lưu.
          </p>

          <div className="flex flex-nowrap items-center gap-2 whitespace-nowrap text-[9px] font-semibold sm:gap-3 sm:text-xs">
            <span className="text-primary">Authentic guaranteed</span>

            <span
              aria-hidden="true"
              className="size-1 shrink-0 rounded-full bg-muted-foreground"
            />

            <span className="text-muted-foreground">
              High-end boutique archive
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
