import SectionHeading from "@/common/SectionHeading";
import Skeleton from "@/common/Skeleton";
import ProductSkeleton from "@/product/ProductSkeleton";

export default function ProductDetailSkeleton() {
  return (
    <div role="status" aria-label="Đang tải chi tiết sản phẩm" aria-busy="true">
      <div className="grid items-start gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="min-w-0">
          <Skeleton className="aspect-689/516 w-full rounded-2xl" />
          <Skeleton className="my-4 h-3 w-32" />
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="aspect-square rounded-xl" />
            ))}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="rounded-2xl border border-border bg-surface p-5 sm:p-8"
        >
          <div className="flex items-center justify-between gap-3">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-6 w-32 rounded-full" />
          </div>
          <Skeleton className="mt-4 h-12 w-4/5" />
          <Skeleton className="mt-5 h-10 w-28" />
          <div className="mt-5 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="mt-6 border-t border-border pt-6">
            <Skeleton className="h-3 w-24" />

            <div className="mt-3 grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }, (_, index) => (
                <Skeleton key={index} className="h-12 rounded-xl" />
              ))}
            </div>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Skeleton className="h-12 rounded-xl" />
              <Skeleton className="h-12 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="mt-8 rounded-2xl border border-border bg-surface p-5 sm:p-8"
      >
        <Skeleton className="h-7 w-44" />
        <div className="mt-5 space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
      <div className="mt-10 sm:mt-12">
        <SectionHeading
          id="related-products-title"
          title="Sản phẩm liên quan"
          description="Khám phá thêm những đôi sneaker dành cho bạn."
        />

        <ProductSkeleton count={2} />
      </div>
    </div>
  );
}
