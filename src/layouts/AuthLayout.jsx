import { Outlet } from "react-router-dom";
import Container from "@/common/Container";
import AuthHeader from "@/layout/auth/AuthHeader";
import AuthVisual from "@/layout/auth/AuthVisual";

export default function AuthLayout() {
  return (
    <section className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex flex-1 items-center pt-8 pb-6 sm:pt-12 sm:pb-8">
        <Container>
          <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-2xl border border-border bg-surface shadow-xl lg:grid-cols-[1.4fr_1fr]">
            <AuthVisual />

            <div className="min-w-0 px-6 py-8 sm:p-10 lg:p-12">
              <AuthHeader />
              <Outlet />
            </div>
          </div>
        </Container>
      </main>

      <footer className="border-t border-border bg-surface py-4">
        <Container>
          <p className="text-center text-xs leading-6 text-muted-foreground">
            © {new Date().getFullYear()} SNEAKER HUB. Boutique Sneaker & Curated
            Footwear.
          </p>
        </Container>
      </footer>
    </section>
  );
}
