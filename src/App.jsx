import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home/Home";
import Shop from "./pages/shop/Shop";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import useAuthStore from "./zustand/authStore";
import { useEffect } from "react";
import Detail from "./pages/productDetail/Detail";

export default function App() {
  const getProfile = useAuthStore((state) => state.getProfile);
  useEffect(() => {
    getProfile();
  }, [getProfile]);
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="detail/:id/:slug?" element={<Detail />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}
