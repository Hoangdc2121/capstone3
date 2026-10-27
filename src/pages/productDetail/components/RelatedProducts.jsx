import SectionHeading from "@/common/SectionHeading";
import ProductList from "@/product/ProductList";

export default function RelatedProducts({ products = [], currentProductId }) {
  const relatedProducts = products.filter(
    (product) => String(product.id) !== String(currentProductId),
  );

  if (relatedProducts.length === 0) return null;

  return (
    <section
      aria-labelledby="related-products-title"
      className="mt-10 sm:mt-12"
    >
      <SectionHeading
        id="related-products-title"
        title="Sản phẩm liên quan"
        description="Khám phá thêm những đôi sneaker dành cho bạn."
      />

      <ProductList products={relatedProducts} />
    </section>
  );
}
