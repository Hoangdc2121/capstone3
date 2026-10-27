import CartItem from "./CartItem";

export default function CartList({
  items = [],
  onSelect,
  onQuantityChange,
  onRemove,
  updatingCartId = null,
}) {
  return (
    <section className="space-y-4">
      {items.map((item) => (
        <CartItem
          key={item.cartId}
          item={item}
          onSelect={onSelect}
          onQuantityChange={onQuantityChange}
          onRemove={onRemove}
          updating={updatingCartId === item.cartId}
          quantityUpdating={updatingCartId !== null}
        />
      ))}
    </section>
  );
}
