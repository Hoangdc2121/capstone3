import { useRef, useState } from "react";
import productApi from "@/services/productService";
import { notifyError, notifyWarning } from "@/utils/notification";
import validateProductSelection from "@/utils/validateProductSelection";
import useAuthStore from "@/zustand/authStore";
import useCartStore from "@/zustand/cartStore";
import useOrderStore from "@/zustand/orderStore";

export default function useCheckoutOrder({ updatingCartId = null } = {}) {
  const [checkingOrder, setCheckingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const submittingRef = useRef(false);

  const orderLoading = useOrderStore((state) => state.orderLoading);
  const orderError = useOrderStore((state) => state.orderError);

  const handleConfirmOrder = async () => {
    if (
      submittingRef.current ||
      useOrderStore.getState().orderLoading ||
      updatingCartId !== null ||
      orderSuccess
    ) {
      return;
    }

    const { user, ischeckingAuth } = useAuthStore.getState();

    if (ischeckingAuth) return;

    if (!user?.email) {
      notifyWarning("Vui lòng đăng nhập để đặt hàng.");
      return;
    }

    // Lưu danh sách đang đặt để không ảnh hưởng dòng chưa chọn
    const selectedItems = useCartStore
      .getState()
      .items.filter((item) => item.selected)
      .map((item) => ({ ...item }));

    if (selectedItems.length === 0) {
      notifyWarning("Vui lòng chọn sản phẩm để đặt hàng.");
      return;
    }

    submittingRef.current = true;
    setCheckingOrder(true);
    useOrderStore.getState().resetOrder();

    let sendingOrder = false;

    try {
      // Gộp số lượng các size cùng một sản phẩm
      const quantities = new Map();

      selectedItems.forEach((item) => {
        const productId = String(item.productId);

        quantities.set(
          productId,
          (quantities.get(productId) || 0) + item.quantity,
        );
      });

      // Mỗi sản phẩm chỉ gọi API chi tiết một lần
      const products = await Promise.all(
        [...quantities.keys()].map(async (productId) => {
          const res = await productApi.getProducById(productId);
          const product = res.data.content;

          if (!product || String(product.id) !== productId || product.deleted) {
            throw new Error("Có sản phẩm không còn được bán.");
          }

          return product;
        }),
      );

      for (const product of products) {
        const productId = String(product.id);

        const productItems = selectedItems.filter(
          (item) => String(item.productId) === productId,
        );

        // Kiểm tra size và số lượng từng dòng
        productItems.forEach((item) => {
          validateProductSelection({
            product,
            size: item.size,
            quantity: item.quantity,
          });
        });

        // Tồn kho chung của tất cả size trong lần đặt này
        if (quantities.get(productId) > Number(product.quantity)) {
          throw new Error(
            `${product.name} chỉ còn ${product.quantity} đôi, tính chung tất cả size.`,
          );
        }
      }

      // Cập nhật giá nếu API trả về giá mới, yêu cầu xem lại
      const prices = new Map(
        products.map((product) => [String(product.id), Number(product.price)]),
      );

      const priceChanged = selectedItems.some(
        (item) => Number(item.price) !== prices.get(String(item.productId)),
      );

      if (priceChanged) {
        useCartStore.setState((state) => ({
          items: state.items.map((item) =>
            prices.has(String(item.productId))
              ? {
                  ...item,
                  price: prices.get(String(item.productId)),
                }
              : item,
          ),
        }));

        notifyWarning(
          "Giá sản phẩm đã thay đổi. Đã cập nhật tổng tiền, vui lòng kiểm tra và xác nhận lại.",
        );
        return;
      }

      // Nếu có chỉnh sửa trong lúc kiểm tra thì chưa gửi đơn
      const currentItems = useCartStore
        .getState()
        .items.filter((item) => item.selected);

      if (JSON.stringify(currentItems) !== JSON.stringify(selectedItems)) {
        notifyWarning(
          "Giỏ hàng đã thay đổi. Vui lòng kiểm tra và xác nhận lại.",
        );
        return;
      }

      // Kiểm tra tài khoản vẫn là người bắt đầu đặt hàng
      if (useAuthStore.getState().user?.email !== user.email) {
        notifyWarning("Tài khoản đã thay đổi. Vui lòng xác nhận lại.");
        return;
      }

      sendingOrder = true;

      const result = await useOrderStore.getState().createOrder({
        email: user.email,
        orderDetail: [...quantities.entries()].map(([productId, quantity]) => ({
          productId,
          quantity,
        })),
      });

      if (!result) return;

      // Trừ đúng số lượng vừa đặt, giữ sản phẩm chưa mua
      const orderedQuantities = new Map(
        selectedItems.map((item) => [item.cartId, item.quantity]),
      );

      useCartStore.setState((state) => ({
        items: state.items.flatMap((item) => {
          const ordered = orderedQuantities.get(item.cartId);

          if (ordered === undefined) return [item];

          const remaining = item.quantity - ordered;

          return remaining > 0 ? [{ ...item, quantity: remaining }] : [];
        }),
      }));

      setOrderSuccess(true);
      await useAuthStore.getState().getProfile();
    } catch (error) {
      if (!sendingOrder) {
        notifyError(
          error.response?.data?.message ||
            error.message ||
            "Không thể kiểm tra đơn hàng.",
        );
      }
    } finally {
      submittingRef.current = false;
      setCheckingOrder(false);
    }
  };

  return {
    handleConfirmOrder,
    checkingOrder,
    orderLoading,
    orderError,
    orderSuccess,
  };
}
