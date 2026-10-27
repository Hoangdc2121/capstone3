import AppButton from "@/common/AppButton";
import Container from "@/common/Container";
import GlowDot from "@/common/GlowDot";
import SectionHeading from "@/common/SectionHeading";
import useLoadIfEmpty from "@/hooks/useLoadIfEmpty";
import ProductList from "@/product/ProductList";
import ProductSkeleton from "@/product/ProductSkeleton";
import filterProductsByCategory from "@/utils/filterProductsByCategory";
import useProductStore from "@/zustand/productStore";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductCatalog({ selectedCategory = "all" }) {
  // # Khu danh sách sản phẩm + link xem tất cả
  const navigate = useNavigate();
  const allProducts = useProductStore((state) => state.allProducts);
  const allProductsLoading = useProductStore(
    (state) => state.allProductsLoading,
  );
  const allProductsError = useProductStore((state) => state.allProductsError);
  useLoadIfEmpty("allProducts", "allProductsLoading", "getAllProducts");

  const filteredProducts = filterProductsByCategory(
    allProducts,
    selectedCategory,
  );

  // hiện 8 cái sản phẩm
  const displayedProducts = [...filteredProducts]
    .filter((product) => !product.deleted)
    .slice(0, 8);
  return (
    <section aria-labelledby="all-title" className="py-6 sm:py-8">
      <Container>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <SectionHeading
            id="all-title"
            title="Khám phá sản phẩm"
            description="Tuyển tập các mẫu giày phong cách đường phố đa dạng từ hệ thống giám tuyển."
            className="mb-0"
          />
          <div className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 font-sans text-xs font-bold uppercase tracking-wide text-foreground">
            <GlowDot className="size-1.5 bg-[#10B981] shadow-[#10B981]/40" />
            {displayedProducts.length} mẫu sản phẩm
          </div>
        </div>
        {allProductsLoading ? (
          <ProductSkeleton count={8} />
        ) : allProductsError ? (
          <div className="rounded-2xl border border-border bg-surface px-6 py-12 text-center">
            <p role="alert" className="text-sm text-destructive">
              {allProductsError}
            </p>
          </div>
        ) : displayedProducts.length > 0 ? (
          <div>
            <ProductList products={displayedProducts} showStock />

            <div className="mt-8 flex justify-center">
              <AppButton
                icon={<LayoutGrid aria-hidden="true" className="size-5" />}
                onClick={() => navigate("/shop")}
              >
                Xem tất cả sản phẩm
                <ArrowRight aria-hidden="true" className="size-4" />
              </AppButton>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-surface px-6 py-12 text-center">
            <p role="status" className="text-sm text-muted-foreground">
              Không có sản phẩm phù hợp.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
