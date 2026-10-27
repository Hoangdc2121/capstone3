import Container from "@/common/Container";
import SectionHeading from "@/common/SectionHeading";
import useLoadIfEmpty from "@/hooks/useLoadIfEmpty";
import ProductList from "@/product/ProductList";
import ProductSkeleton from "@/product/ProductSkeleton";
import filterProductsByCategory from "@/utils/filterProductsByCategory";
import useProductStore from "@/zustand/productStore";
import { useState } from "react";

export default function FeaturedProducts({ selectedCategory = "all" }) {
  // # Khu sản phẩm nổi bật + link xem thêm
  const featuredProducts = useProductStore((state) => state.featuredProducts);
  const featuredProductsLoading = useProductStore(
    (state) => state.featuredProductsLoading,
  );
  const featuredProductsError = useProductStore(
    (state) => state.featuredProductsError,
  );

  useLoadIfEmpty(
    "featuredProducts",
    "featuredProductsLoading",
    "getFeaturedProducts",
  );

  // loc sản phẩm
  const filteredProducts = filterProductsByCategory(
    featuredProducts,
    selectedCategory,
  );

  // random lấy tối đa 4 sẩn phẩm
  const [randomValue] = useState(() => Math.random());
  const startIndex = Math.floor(randomValue * filteredProducts.length);
  const randomProducts = Array.from(
    { length: Math.min(4, filteredProducts.length) },
    (_, index) =>
      filteredProducts[(startIndex + index) % filteredProducts.length],
  );
  return (
    <section aria-labelledby="featured-title" className="py-6 sm:py-8">
      <Container>
        <SectionHeading
          id="featured-title"
          title="Sản phẩm nổi bật"
          description="Những đôi sneaker được chọn để làm mới phong cách của bạn."
          to="/shop?feature=true"
          onLinkClick={() => {
            useProductStore.getState().setPageIndex(1);
          }}
        />

        {featuredProductsLoading ? (
          <ProductSkeleton count={4} />
        ) : randomProducts.length > 0 ? (
          <ProductList products={randomProducts} />
        ) : (
          <p
            role={featuredProductsError ? "alert" : "status"}
            className="text-sm text-muted-foreground"
          >
            {featuredProductsError ||
              (selectedCategory === "all"
                ? "Chưa có sản phẩm nổi bật."
                : "Không có sản phẩm nổi bật trong danh mục này.")}
          </p>
        )}
      </Container>
    </section>
  );
}
