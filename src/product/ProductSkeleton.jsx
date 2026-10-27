import ProductItemSkeleton from "./ProductItemSkeleton";

export default function ProductSkeleton({ count = 4 }) {
  return (
    <div role="status" aria-label="Đang tải sản phẩm" aria-busy="true">
      <span className="sr-only">Đang tải sản phẩm...</span>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: count }, (_, index) => (
          <ProductItemSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
