import AppButton from "@/common/AppButton";
import Container from "@/common/Container";
import GlowDot from "@/common/GlowDot";
import useLoadIfEmpty from "@/hooks/useLoadIfEmpty";
import getProductImage from "@/utils/getProductImage";
import useProductStore from "@/zustand/productStore";
import { ArrowRight, BadgeCheck, ShoppingBag, Sparkle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroBanner() {
  const navigate = useNavigate();
  const featuredProducts = useProductStore((state) => state.featuredProducts);
  const featuredProductsLoading = useProductStore(
    (state) => state.featuredProductsLoading,
  );
  const featuredProductsError = useProductStore(
    (state) => state.featuredProductsError,
  );
  const [randomValue] = useState(() => Math.random());
  const product =
    featuredProducts.length > 0
      ? featuredProducts[Math.floor(randomValue * featuredProducts.length)]
      : null;

  useLoadIfEmpty(
    "featuredProducts",
    "featuredProductsLoading",
    "getFeaturedProducts",
  );

  // # Banner lớn đầu trang + nút mua sắm
  return (
    <section aria-labelledby="hero-title" className="py-5 sm:py-8">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-linear-to-b from-background via-secondary to-accent shadow-[0_12px_40px_-12px] shadow-primary/12">
          <div className="relative grid items-center gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-2 lg:gap-10 lg:px-12 lg:py-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-primary">
                <GlowDot className="size-1.5" />
                DROP MỚI NHẤT
              </span>
              <h1
                id="hero-title"
                className="mt-6 font-heading text-6xl leading-[0.95] text-foreground sm:text-7xl lg:text-8xl"
              >
                BƯỚC RA
                <span className="mt-2 block bg-linear-to-r from-primary to-[#CC5FA3] bg-clip-text text-transparent">
                  KHÁC BIỆT
                </span>
              </h1>
              <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
                Tự tin khẳng định phong cách cá nhân với các thiết kế sneaker
                biểu tượng tuyển chọn từ kho dữ liệu nguyên bản, kiểm định 100%
                chuẩn xác.
              </p>

              {/* nút điều hướng */}
              <div className="mt-8 flex flex-wrap gap-3">
                <AppButton
                  icon={<ShoppingBag arria-hidden="true" className="size-4" />}
                >
                  <span className="text-sm">Mua sắm ngay</span>
                  <ArrowRight aria-hidden="true" className="size-4" />
                </AppButton>

                <AppButton
                  type="default"
                  className="group"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#EADBD8",
                  }}
                  icon={
                    <Sparkle
                      arria-hidden="true"
                      className="size-4"
                      style={{ color: "var(--primary)" }}
                    />
                  }
                  onClick={() => navigate("/shop?feature=true")}
                >
                  <span className="text-sm text-[#2D2430] transition-colors duration-200 group-hover:text-primary">
                    Sản phẩm nổi bật
                  </span>
                </AppButton>
              </div>
            </div>
            {/* Sản phẩm trong banner */}
            <div className="relative isolate flex min-h-80 items-center justify-center pb-16 sm:min-h-115">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -z-10 aspect-square w-[60%] rounded-full  border border-border bg-linear-to-b from-background via-secondary to-accent shadow-[0_12px_40px_-12px] shadow-primary/12"
              />

              {product ? (
                <>
                  <button
                    type="button"
                    aria-label={`Xem chi tiết ${product.name}`}
                    onClick={() => navigate(`/detail/${product.id}`)}
                    className="group block w-full -rotate-12 rounded-xl transition-transform duration-300 hover:-translate-y-2 hover:rotate-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    <img
                      src={getProductImage(product.image)}
                      alt={product.name}
                      fetchPriority="high"
                      className="mx-auto h-64 w-full object-contain drop-shadow-2xl sm:h-80 lg:h-96"
                    />
                  </button>

                  {/* Thẻ thông tin: tự đổi màu theo light / dark */}
                  <div className="absolute bottom-18 right-10 z-10 flex max-w-[calc(100%-1.5rem)] items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 shadow-xl sm:bottom-10 sm:right-6">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                      <BadgeCheck aria-hidden="true" className="size-5" />
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 whitespace-nowrap text-xs font-bold uppercase">
                        <span className="shrink-0 text-muted-foreground">
                          Spotlight drop
                        </span>

                        <span
                          aria-hidden="true"
                          className="size-1 shrink-0 rounded-full bg-primary"
                        />

                        <span className="truncate text-foreground">
                          {product.name}
                        </span>
                      </div>

                      <p className="mt-1.5 font-heading text-2xl leading-none text-primary">
                        {product.price.toLocaleString("en-US")} $
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <p
                  role={featuredProductsError ? "alert" : undefined}
                  className="relative px-6 text-center text-sm text-muted-foreground"
                >
                  {featuredProductsLoading
                    ? "Đang tải sản phẩm..."
                    : featuredProductsError || "Chưa có sản phẩm nổi bật."}
                </p>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
