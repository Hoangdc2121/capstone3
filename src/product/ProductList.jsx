import ProductItem from "./ProductItem";

export default function ProductList({ products = [], showStock = false }) {
  // # Xếp danh sách ProductCard thành lưới

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 ">
      {products.map((item) => (
        <ProductItem key={item.id} products={item} showStock={showStock} />
      ))}
    </div>
  );
}
