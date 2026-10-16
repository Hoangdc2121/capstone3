import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  // # Header + Outlet (nội dung trang) + Footer
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Thêm <Footer /> khi làm xong */}
      <Footer />
    </div>
  );
}
