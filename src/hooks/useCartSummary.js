import useCartStore from "@/zustand/cartStore";

export default function useCartSummary() {
  const items = useCartStore((state) => state.items);

  const selectedItems = items.filter((item) => item.selected);

  const totalQuantity = selectedItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const subtotal = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return {
    selectedItems,
    selectedCount: selectedItems.length,
    totalQuantity,
    subtotal,
  };
}
