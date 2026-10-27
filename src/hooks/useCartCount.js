import useCartStore from "@/zustand/cartStore";

export default function useCartCount() {
  return useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );
}
