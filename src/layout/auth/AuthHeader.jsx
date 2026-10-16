import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import HeaderLogo from "../header/HeaderLogo";
import { AnimatedThemeToggle } from "@/components/ui/animated-theme-toggle";

export default function AuthHeader() {
  return (
    <section className="mb-4 flex items-center justify-between gap-4">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Về trang chủ
      </Link>
      <div className="flex shrink-0 items-center gap-3">
        <HeaderLogo compact />
        <AnimatedThemeToggle />
      </div>
    </section>
  );
}
