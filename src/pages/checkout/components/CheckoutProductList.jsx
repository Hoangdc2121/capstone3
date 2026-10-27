import CartItem from "@/pages/cart/components/CartItem";
import { ShoppingCart } from "lucide-react";

export default function CheckoutProductList({
  items = [],
  onQuantityChange,
  onRemove,
  updatingCartId = null,
}) {
  
  return (
    <section
      aria-labelledby="checkout-products-title"
      className="rounded-2xl border border-border bg-surface p-5 sm:p-6"
    >
      <div className="flex items-center gap-2">
        <ShoppingCart
          aria-hidden="true"
          className="size-4 shrink-0 text-foreground"
        />

        <h2
          id="checkout-products-title"
          className="font-heading text-2xl uppercase text-foreground"
        >
          Giỏ hàng
        </h2>
      </div>

      <div className="mt-5 space-y-4 border-t border-border pt-5">
        {items.map((item) => (
          <CartItem
            key={item.cartId}
            item={item}
            showCheckbox={false}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
            updating={updatingCartId === item.cartId}
            quantityUpdating={updatingCartId !== null}
          />
        ))}
      </div>
    </section>
  );
}
