import Container from "@/common/Container";
import SectionHeading from "@/common/SectionHeading";
import useProductStore from "@/zustand/productStore";
import { useEffect, useRef } from "react";
import CategoryBar from "../home/components/CategoryBar";
import filterProductsByCategory from "@/utils/filterProductsByCategory";
import { useSearchParams } from "react-router-dom";
import ProductList from "@/product/ProductList";
import { Pagination } from "antd";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isFeatured = searchParams.get("feature") === "true";
  const selectedCategory = searchParams.get("category") || "all";

  const {
    products,
    pageIndex,
    pageSize,
    totalRow,
    productsLoading,
    productsError,
    getProducts,
    setPageIndex,

    allProducts,
    allProductsLoading,
    allProductsError,
    getAllProducts,

    featuredProducts,
    featuredProductsLoading,
    featuredProductsError,
    getFeaturedProducts,
  } = useProductStore();

  const filterLocally = isFeatured || selectedCategory !== "all";

  const keywords = (searchParams.get("keywords") || "").trim();
  const filterKey = JSON.stringify([keywords, isFeatured, selectedCategory]);
  const previousFilterKey = useRef(null);
  useEffect(() => {
    if (previousFilterKey.current !== filterKey) {
      previousFilterKey.current = filterKey;

      if (pageIndex !== 1) {
        setPageIndex(1);
        return;
      }
    }
    const state = useProductStore.getState();
    if (isFeatured) {
      if (
        state.featuredProducts.length === 0 &&
        !state.featuredProductsLoading
      ) {
        getFeaturedProducts();
      }
      return;
    }
    if (selectedCategory !== "all") {
      if (state.allProducts.length === 0 && !state.allProductsLoading) {
        getAllProducts();
      }
      return;
    }
    getProducts(keywords);
  }, [
    keywords,
    filterKey,
    isFeatured,
    selectedCategory,
    pageIndex,
    pageSize,
    setPageIndex,
    getProducts,
    getAllProducts,
    getFeaturedProducts,
  ]);

  let displayedProducts = products;
  let total = totalRow;
  let loading = productsLoading;
  let error = productsError;
  let currentPage = pageIndex;
  if (filterLocally) {
    const sourceProducts = isFeatured ? featuredProducts : allProducts;
    const categoryProducts = filterProductsByCategory(
      sourceProducts.filter((product) => !product.deleted),
      selectedCategory,
    );
    const filteredProducts = categoryProducts.filter((product) =>
      product.name.toLowerCase().includes(keywords.toLowerCase()),
    );

    total = filteredProducts.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    currentPage = Math.min(pageIndex, totalPages);
    const startIndex = (currentPage - 1) * pageSize;
    displayedProducts = filteredProducts.slice(
      startIndex,
      startIndex + pageSize,
    );

    loading = isFeatured ? featuredProductsLoading : allProductsLoading;
    error = isFeatured ? featuredProductsError : allProductsError;
  }

  const handleCategoryChange = (value) => {
    setPageIndex(1);
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      if (value === "all") {
        next.delete("feature");
        next.delete("category");
      } else if (value === "featured") {
        next.set("feature", "true");
        next.delete("category");
      } else {
        next.set("category", value);
      }
      return next;
    });
  };
  return (
    <div className="py-6 sm:py-8">
      <Container>
        <SectionHeading
          id="shop-title"
          title={
            keywords
              ? `Kết quả tìm kiếm: ${keywords}`
              : isFeatured
                ? "Sản phẩm nổi bật"
                : "Tất cả sản phẩm"
          }
          description={
            isFeatured
              ? "Khám phá những đôi sneaker nổi bật trong bộ sưu tập."
              : "Tìm đôi sneaker phù hợp với phong cách của bạn."
          }
        />
        <CategoryBar
          showFeatured
          isFeatured={isFeatured}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        <section aria-labelledby="shop-title">
          <Container>
            {loading ? (
              <p
                role="status"
                className="py-12 text-center text-sm text-muted-foreground"
              >
                {" "}
                Đang tải sản phẩm...
              </p>
            ) : error ? (
              <p
                role="alert"
                className="rounded-2xl border border-border bg-surface px-6 py-12 text-center text-sm text-destructive"
              >
                {error}
              </p>
            ) : displayedProducts.length > 0 ? (
              <>
                <p className="mb-4 text-sm text-muted-foreground">
                  Có
                  <span className="font-semibold text-foreground">{total}</span>
                  Sản phẩm
                </p>
                <ProductList
                  products={displayedProducts}
                  showStock={!isFeatured}
                />
                {total > pageSize && (
                  <div className="mt-8 flex justify-center">
                    <Pagination
                      current={currentPage}
                      pageSize={pageSize}
                      total={total}
                      onChange={setPageIndex}
                      showSizeChanger={false}
                      responsive
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-2xl border border-border bg-surface px-6 py-12 text-center">
                <p role="status" className="text-sm text-muted-foreground">
                  Không có sản phẩm phù hợp với bộ lọc này
                </p>
              </div>
            )}
          </Container>
        </section>
      </Container>
    </div>
  );
}
