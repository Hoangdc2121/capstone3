import { cn } from "@/lib/utils";
import ProductItem from "./ProductItem";

export default function ProductList({
  products = [],
  showStock = false,
  showPrice = true,
  className,
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {products.map((item) => (
        <ProductItem
          key={item.id}
          products={item}
          showStock={showStock}
          showPrice={showPrice}
        />
      ))}
    </div>
  );
}
