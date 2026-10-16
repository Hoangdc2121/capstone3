import { VercelTabs } from "@/components/ui/vercel-tabs";
import { useHeaderNavigation } from "@/hooks/useHeaderNavigation";
import useProductStore from "@/zustand/productStore";

const navigationTabs = [
  {
    label: "Trang chủ",
    value: "home",
    to: "/",
  },
  {
    label: "Tất cả sản phẩm",
    value: "products",
    to: "/shop",
    onClick: () => {
      useProductStore.getState().setPageIndex(1);
    },
  },
];

export default function HeaderNav() {
  const { pathname, isProductPage } = useHeaderNavigation();

  let activeTab = null;

  if (pathname === "/") {
    activeTab = "home";
  } else if (isProductPage) {
    activeTab = "products";
  }

  return (
    <VercelTabs
      tabs={navigationTabs}
      activeTab={activeTab}
      className="hidden lg:block"
    />
  );
}
