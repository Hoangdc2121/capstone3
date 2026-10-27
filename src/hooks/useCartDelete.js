import { useState } from "react";
import useCartStore from "@/zustand/cartStore";

export default function useCartDelete() {
  const [deleteIds, setDeleteIds] = useState([]);

  const removeFromCart = useCartStore((state) => state.removeFromCart);

  // Mở modal xóa một sp
  const handleRequestRemove = (cartId) => {
    setDeleteIds([cartId]);
  };

  // Mở modal xóa các sp
  const handleRequestRemoveSelected = () => {
    const selectedIds = useCartStore
      .getState()
      .items.filter((item) => item.selected)
      .map((item) => item.cartId);

    setDeleteIds(selectedIds);
  };

  const handleConfirmRemove = () => {
    deleteIds.forEach((cartId) => removeFromCart(cartId));
    setDeleteIds([]);
  };

  const handleCloseDelete = () => {
    setDeleteIds([]);
  };

  return {
    deleteIds,
    handleRequestRemove,
    handleRequestRemoveSelected,
    handleConfirmRemove,
    handleCloseDelete,
  };
}
