import validateProductSelection from "@/utils/validateProductSelection";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addToCart: ({ product, size, quantity = 1 }) => {
        const { selectedSize, amount, stock } = validateProductSelection({
          product,
          size,
          quantity,
        });

        const productId = String(product.id);
        const items = get().items;

        const quantityInCart = items
          .filter((item) => item.productId === productId)
          .reduce((total, item) => total + item.quantity, 0);

        if (quantityInCart + amount > stock) {
          throw new Error(`Sản phẩm chỉ còn ${stock} đôi.`);
        }

        const cartId = `${productId}-${selectedSize}`;
        const existingItem = items.find((item) => item.cartId === cartId);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.cartId === cartId
                ? {
                    ...item,
                    quantity: item.quantity + amount,
                  }
                : item,
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                cartId,
                productId,
                name: product.name,
                alias: product.alias,
                image: product.image,
                price: product.price,
                size: selectedSize,
                quantity: amount,
                selected: true,
              },
            ],
          });
        }
      },

      selectAll: (selected) => {
        set((state) => ({
          items: state.items.map((item) => ({
            ...item,
            selected,
          })),
        }));
      },

      // Xóa một dòng sản phẩm theo size
      removeFromCart: (cartId) => {
        set((state) => ({
          items: state.items.filter((item) => item.cartId !== cartId),
        }));
      },

      // Xóa toàn bộ giỏ hàng
      clearCart: () => {
        set({ items: [] });
      },

      // Chọn hoặc bỏ chọn một dòng sản phẩm
      setItemSelected: (cartId, selected) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.cartId === cartId ? { ...item, selected } : item,
          ),
        }));
      },

      // Cập nhật số lượng, kiểm tra tồn kho chung của các size
      updateQuantity: (cartId, quantity, stock) => {
        const amount = Number(quantity);
        const availableStock = Number(stock);

        if (!Number.isInteger(amount) || amount < 1) {
          throw new Error("Số lượng không hợp lệ.");
        }

        if (!Number.isFinite(availableStock) || availableStock < 0) {
          throw new Error("Không thể kiểm tra tồn kho sản phẩm.");
        }

        const items = get().items;
        const currentItem = items.find((item) => item.cartId === cartId);

        if (!currentItem) return;

        const otherSizesQuantity = items
          .filter(
            (item) =>
              item.productId === currentItem.productId &&
              item.cartId !== cartId,
          )
          .reduce((total, item) => total + item.quantity, 0);

        if (otherSizesQuantity + amount > availableStock) {
          throw new Error(
            `Sản phẩm chỉ còn ${availableStock} đôi, tính chung tất cả size.`,
          );
        }

        set({
          items: items.map((item) =>
            item.cartId === cartId ? { ...item, quantity: amount } : item,
          ),
        });
      },

      // Đổi size của một dòng sản phẩm
      changeSize: (cartId, size, product) => {
        const items = get().items;
        const currentItem = items.find((item) => item.cartId === cartId);

        if (!currentItem) return;

        if (String(product.id) !== currentItem.productId) {
          throw new Error("Thông tin sản phẩm không hợp lệ.");
        }

        const { selectedSize, stock } = validateProductSelection({
          product,
          size,
          quantity: currentItem.quantity,
        });

        if (selectedSize === currentItem.size) return;

        // Tồn kho được tính chung tất cả size
        const totalQuantity = items
          .filter((item) => item.productId === currentItem.productId)
          .reduce((total, item) => total + item.quantity, 0);

        if (totalQuantity > stock) {
          throw new Error(
            `Sản phẩm chỉ còn ${stock} đôi, tính chung tất cả size.`,
          );
        }

        const newCartId = `${currentItem.productId}-${selectedSize}`;

        const existingItem = items.find((item) => item.cartId === newCartId);

        if (existingItem) {
          // Size mới đã có trong giỏ: gộp số lượng
          set({
            items: items
              .filter((item) => item.cartId !== cartId)
              .map((item) =>
                item.cartId === newCartId
                  ? {
                      ...item,
                      quantity: item.quantity + currentItem.quantity,
                      selected: item.selected || currentItem.selected,
                    }
                  : item,
              ),
          });
        } else {
          // Size mới chưa có: cập nhật dòng hiện tại
          set({
            items: items.map((item) =>
              item.cartId === cartId
                ? {
                    ...item,
                    cartId: newCartId,
                    size: selectedSize,
                  }
                : item,
            ),
          });
        }
      },
    }),
    {
      name: "sneaker-hub-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
      }),
    },
  ),
);

export default useCartStore;
