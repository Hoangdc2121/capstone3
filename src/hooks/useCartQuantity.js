import { useRef, useState } from "react";
import productApi from "@/services/productService";
import { notifyError } from "@/utils/notification";
import useCartStore from "@/zustand/cartStore";

export default function useCartQuantity() {
  const [updatingCartId, setUpdatingCartId] = useState(null);
  const updatingRef = useRef(false);

  const handleQuantityChange = async (cartId, quantity) => {
    if (updatingRef.current) return;

    const item = useCartStore
      .getState()
      .items.find((item) => item.cartId === cartId);

    if (!item) return;

    updatingRef.current = true;
    setUpdatingCartId(cartId);

    try {
      const res = await productApi.getProducById(item.productId);
      const product = res.data.content;

      useCartStore
        .getState()
        .updateQuantity(cartId, quantity, product.quantity);
    } catch (error) {
      notifyError(
        error.response?.data?.message ||
          error.message ||
          "Không thể cập nhật số lượng.",
      );
    } finally {
      updatingRef.current = false;
      setUpdatingCartId(null);
    }
  };

  return {
    updatingCartId,
    handleQuantityChange,
  };
}
