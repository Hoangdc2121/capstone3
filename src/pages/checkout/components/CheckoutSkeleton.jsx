import Skeleton from "@/common/Skeleton";

export default function CheckoutSkeleton() {
  return (
    <div role="status" aria-label="Đang tải thông tin đặt hàng">
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-6">
          {/* Thông tin người đặt */}
          <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
            <Skeleton className="h-8 w-52 max-w-full" />

            <div className="mt-5 grid gap-6 border-t border-border pt-5 sm:grid-cols-2">
              {Array.from({ length: 3 }, (_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-5 w-40 max-w-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Sản phẩm đặt mua */}
          <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
            <Skeleton className="h-8 w-48 max-w-full" />

            <div className="mt-5 space-y-4 border-t border-border pt-5">
              {Array.from({ length: 2 }, (_, index) => (
                <div key={index} className="flex items-start gap-4">
                  <Skeleton className="size-20 shrink-0 rounded-xl sm:size-24" />

                  <div className="min-w-0 flex-1 space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-8 w-28 rounded-lg" />
                    <Skeleton className="h-4 w-32" />

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <Skeleton className="h-10 w-32 rounded-xl" />
                      <Skeleton className="h-7 w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tóm tắt đơn hàng */}
        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <Skeleton className="h-8 w-48 max-w-full" />

          <div className="mt-5 space-y-4 border-t border-border pt-5">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="flex justify-between gap-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-between gap-4 border-t border-border pt-5">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>

          <Skeleton className="mt-6 h-12 w-full rounded-xl" />
        </div>
      </div>

      <span className="sr-only">Đang tải thông tin đặt hàng...</span>
    </div>
  );
}
