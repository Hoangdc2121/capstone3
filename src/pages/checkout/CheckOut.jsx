import Container from "@/common/Container";
import useAuthStore from "@/zustand/authStore";
import useCartStore from "@/zustand/cartStore";
import useCartQuantity from "@/hooks/useCartQuantity";
import CheckoutHeader from "./components/CheckoutHeader";
import CheckoutCustomer from "./components/CheckoutCustomer";
import CheckoutProductList from "./components/CheckoutProductList";
import CartDeleteModal from "@/pages/cart/components/CartDeleteModal";
import CartSummary from "../cart/components/CartSummary";
import useCartDelete from "@/hooks/useCartDelete";
import useCheckoutOrder from "@/hooks/useCheckoutOrder";
import CheckoutSuccess from "./components/CheckoutSuccess";
import CheckoutEmpty from "./components/CheckoutEmpty";
import { useNavigate } from "react-router-dom";
import AppButton from "@/common/AppButton";
import CheckoutSkeleton from "./components/CheckoutSkeleton";
import { ReceiptText } from "lucide-react";

export default function Checkout() {
  const user = useAuthStore((state) => state.user);
  const cartItems = useCartStore((state) => state.items);
  const items = cartItems.filter((item) => item.selected);
  const { updatingCartId, handleQuantityChange } = useCartQuantity();
  const ischeckingAuth = useAuthStore((state) => state.ischeckingAuth);
  const navigate = useNavigate();
  const {
    deleteIds,
    handleRequestRemove,
    handleConfirmRemove,
    handleCloseDelete,
  } = useCartDelete();

  const {
    handleConfirmOrder,
    checkingOrder,
    orderLoading,
    orderError,
    orderSuccess,
  } = useCheckoutOrder({ updatingCartId });

  const orderBusy = checkingOrder || orderLoading;

  return (
    <section
      aria-labelledby={
        orderSuccess
          ? "checkout-success-title"
          : ischeckingAuth || !user
            ? undefined
            : items.length === 0
              ? "checkout-empty-title"
              : "checkout-title"
      }
      className="py-6 sm:py-8"
    >
      <Container>
        {orderSuccess ? (
          <CheckoutSuccess />
        ) : (
          <>
            {items.length > 0 && (ischeckingAuth || user) && <CheckoutHeader />}

            {ischeckingAuth ? (
              <CheckoutSkeleton />
            ) : !user ? (
              <div className="rounded-2xl border border-border bg-surface px-5 py-12 text-center">
                <p className="text-sm text-muted-foreground">
                  Vui lòng đăng nhập để tiếp tục đặt hàng.
                </p>

                <AppButton
                  className="mt-5 normal-case!"
                  onClick={() => navigate("/login")}
                >
                  Đăng nhập
                </AppButton>
              </div>
            ) : items.length === 0 ? (
              <CheckoutEmpty />
            ) : (
              <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
                <div inert={orderBusy} className="min-w-0 space-y-6">
                  <CheckoutCustomer user={user} />

                  <CheckoutProductList
                    items={items}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRequestRemove}
                    updatingCartId={updatingCartId}
                  />
                </div>

                <CartSummary
                  title="Tóm tắt đơn hàng"
                  titleIcon={
                    <ReceiptText
                      aria-hidden="true"
                      className="size-4 shrink-0 text-foreground"
                    />
                  }
                  items={items}
                  updating={updatingCartId !== null}
                  loading={orderBusy}
                  error={orderError}
                  buttonText="Xác nhận đặt hàng"
                  onCheckout={handleConfirmOrder}
                />
              </div>
            )}
          </>
        )}

        <CartDeleteModal
          open={deleteIds.length > 0}
          count={deleteIds.length}
          productName={
            cartItems.find((item) => item.cartId === deleteIds[0])?.name || ""
          }
          onClose={handleCloseDelete}
          onConfirm={handleConfirmRemove}
        />
      </Container>
    </section>
  );
}
