import Skeleton from "@/common/Skeleton";

export default function ProductItemSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="mt-2 flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
    >
      {/* Ảnh sản phẩm */}
      <div className="relative aspect-square bg-surface-image">
        <Skeleton className="absolute left-4 top-4 h-6 w-20 rounded-full" />
        <Skeleton className="absolute right-3 top-3 size-9 rounded-full" />

        <div className="flex h-full items-center justify-center p-6">
          <Skeleton className="h-1/2 w-4/5 rounded-2xl" />
        </div>
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="min-h-12 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        <div className="mt-2 min-h-12 space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>

        <div className="mt-auto pt-4">
          <div className="border-t border-border pt-4">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="mt-4 h-12 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
