import Container from "@/common/Container";
import { notifyWarning } from "@/utils/notification";
import useCartStore from "@/zustand/cartStore";
import CartHeader from "./components/CartHeader";
import CartEmpty from "./components/CartEmpty";
import CartList from "./components/CartList";
import CartToolbar from "./components/CartToolbar";
import CartDeleteModal from "./components/CartDeleteModal";
import CartSummary from "./components/CartSummary";
import { useNavigate } from "react-router-dom";
import useOrderStore from "@/zustand/orderStore";
import useCartQuantity from "@/hooks/useCartQuantity";
import useCartDelete from "@/hooks/useCartDelete";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const selectAll = useCartStore((state) => state.selectAll);
  const setItemSelected = useCartStore((state) => state.setItemSelected);
  const { updatingCartId, handleQuantityChange } = useCartQuantity();
  const navigate = useNavigate();
  const resetOrder = useOrderStore((state) => state.resetOrder);
  const handleSelect = (cartId, selected) => {
    setItemSelected(cartId, selected);
  };

  const {
    deleteIds,
    handleRequestRemove,
    handleRequestRemoveSelected,
    handleConfirmRemove,
    handleCloseDelete,
  } = useCartDelete();

  const handleCheckout = () => {
    if (!items.some((item) => item.selected)) {
      notifyWarning("Vui lòng chọn sản phẩm để thanh toán.");
      return;
    }
    resetOrder();
    navigate("/checkout");
  };

  return (
    <section aria-labelledby="cart-title" className="py-6 sm:py-8">
      <Container>
        <CartHeader count={items.length} />

        {items.length === 0 ? (
          <CartEmpty />
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="min-w-0">
              <CartToolbar
                items={items}
                onSelectAll={selectAll}
                onRemoveSelected={handleRequestRemoveSelected}
              />

              <CartList
                items={items}
                onSelect={handleSelect}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRequestRemove}
                updatingCartId={updatingCartId}
              />
            </div>

            <CartSummary
              items={items}
              updating={updatingCartId !== null}
              onCheckout={handleCheckout}
            />
          </div>
        )}

        <CartDeleteModal
          open={deleteIds.length > 0}
          count={deleteIds.length}
          productName={
            items.find((item) => item.cartId === deleteIds[0])?.name || ""
          }
          onClose={handleCloseDelete}
          onConfirm={handleConfirmRemove}
        />
      </Container>
    </section>
  );
}
