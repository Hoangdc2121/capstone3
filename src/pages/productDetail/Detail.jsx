import React, { useEffect } from "react";
import ProductGallery from "./components/ProductGallery";
import { Link, useNavigate, useParams } from "react-router-dom";
import useProductStore from "@/zustand/productStore";
import Container from "@/common/Container";
import ProductInfo from "./components/ProductInfo";
import ProductDescription from "./components/ProductDescription";
import RelatedProducts from "./components/RelatedProducts";
import AppButton from "@/common/AppButton";
import { VercelTabs } from "@/components/ui/vercel-tabs";
import ProductDetailSkeleton from "./components/ProductDetailSkeleton";
import useProductPurchase from "@/hooks/useProductPurchase";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productDetail = useProductStore((state) => state.productDetail);
  const productDetailLoading = useProductStore(
    (state) => state.productDetailLoading,
  );
  const productDetailError = useProductStore(
    (state) => state.productDetailError,
  );
  const getProductById = useProductStore((state) => state.getProductById);

  const { handleAddToCart, handleBuyNow } = useProductPurchase();

  useEffect(() => {
    getProductById(id);
  }, [id, getProductById]);

  const currentProduct =
    productDetail && String(productDetail.id) === id ? productDetail : null;

  useEffect(() => {
    if (!currentProduct) return;

    const slug =
      currentProduct.alias ||
      currentProduct.name.trim().toLowerCase().replace(/\s+/g, "-");

    navigate(`/detail/${currentProduct.id}/${encodeURIComponent(slug)}`, {
      replace: true,
    });
  }, [currentProduct, navigate]);

  return (
    <section className="py-6 sm:py-8">
      <Container>
        {productDetailLoading || (!productDetailError && !currentProduct) ? (
          <ProductDetailSkeleton />
        ) : productDetailError ? (
          <div className="rounded-2xl border border-border bg-surface px-6 py-12 text-center">
            <p role="alert" className="text-sm text-destructive">
              {productDetailError}
            </p>

            <AppButton className="mt-5" onClick={() => getProductById(id)}>
              Thử lại
            </AppButton>

            <Link
              to="/shop"
              className="mt-4 block text-sm text-muted-foreground hover:text-primary"
            >
              Về tất cả sản phẩm
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <VercelTabs
                mode="breadcrumb"
                ariaLabel="Đường dẫn sản phẩm"
                className="min-w-0 max-w-full overflow-x-auto"
                tabs={[
                  {
                    label: "Trang chủ",
                    value: "home",
                    to: "/",
                  },
                  {
                    label: "Tất cả sản phẩm",
                    value: "shop",
                    to: "/shop",
                  },
                  {
                    label: currentProduct.name,
                    value: "current",
                  },
                ]}
              />
            </div>
            <div className="grid items-start gap-6 lg:grid-cols-[1.4fr_1fr]">
              <ProductGallery
                key={`gallery-${currentProduct.id}`}
                productDetail={currentProduct}
              />

              <ProductInfo
                key={`info-${currentProduct.id}`}
                productDetail={currentProduct}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            </div>
            <ProductDescription description={currentProduct.description} />
            <RelatedProducts
              products={currentProduct.relatedProducts || []}
              currentProductId={currentProduct.id}
            />
          </>
        )}
      </Container>
    </section>
  );
}
