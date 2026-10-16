import { useLocation } from "react-router-dom";

export function useHeaderNavigation() {
  // # Hook để xử lý điều hướng trong header
  const { pathname, search } = useLocation();
  const isProductPage = pathname === "/shop";
  const isFeatured = new URLSearchParams(search).get("featured") === "true";

  return {
    pathname,
    isProductPage,
    isFeatured,
  };
}
