import { useNavigate } from "react-router-dom";

import useCartStore from "@/zustand/cartStore";
import useOrderStore from "@/zustand/orderStore";
import { notifyError, notifySuccess } from "@/utils/notification";

export default function useProductPurchase() {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const resetOrder = useOrderStore((state) => state.resetOrder);

  const handleAddToCart = (data) => {
    try {
      addToCart(data);
      notifySuccess("Đã thêm sản phẩm vào giỏ hàng.");
    } catch (error) {
      notifyError(error.message);
    }
  };

  const handleBuyNow = (data) => {
    try {
      addToCart(data);

      const cartId = `${String(data.product.id)}-${String(data.size).trim()}`;

      useCartStore.getState().setItemSelected(cartId, true);

      resetOrder();
      navigate("/checkout");
    } catch (error) {
      notifyError(error.message);
    }
  };

  return {
    handleAddToCart,
    handleBuyNow,
  };
}
