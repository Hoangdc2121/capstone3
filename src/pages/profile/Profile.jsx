import { useNavigate, useSearchParams } from "react-router-dom";
import Container from "@/common/Container";
import useAuthStore from "@/zustand/authStore";
import ProfileHeader from "./components/ProfileHeader";
import ProfileSidebar from "./components/ProfileSidebar";
import ProfileInfoForm from "./components/ProfileInfoForm";
import ProfileOrderHistory from "./components/ProfileOrderHistory";
import ProfileFavorites from "./components/ProfileFavorites";
import ProfileSkeleton from "./components/ProfileSkeleton";

export default function Profile() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const user = useAuthStore((state) => state.user);
  const ischeckingAuth = useAuthStore((state) => state.ischeckingAuth);
  const logout = useAuthStore((state) => state.logout);

  const requestedTab = searchParams.get("tab") || "info";

  const activeTab = ["info", "orders", "favorites"].includes(requestedTab)
    ? requestedTab
    : "info";
  console.log("Lịch sử đơn hàng:", user?.ordersHistory);

  const handleTabChange = (value) => {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);

      if (value === "info") {
        next.delete("tab");
      } else {
        next.set("tab", value);
      }

      return next;
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <section aria-labelledby="profile-title" className="py-6 sm:py-8">
      <Container>
        <ProfileHeader />

        {ischeckingAuth ? (
          <ProfileSkeleton />
        ) : !user ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            Vui lòng đăng nhập để xem tài khoản.
          </p>
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            <ProfileSidebar
              user={user}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onLogout={handleLogout}
            />

            <div className="min-w-0">
              {activeTab === "info" && user && <ProfileInfoForm user={user} />}

              {activeTab === "orders" && user && (
                <ProfileOrderHistory orders={user.ordersHistory || []} />
              )}

              {activeTab === "favorites" && user && <ProfileFavorites />}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
