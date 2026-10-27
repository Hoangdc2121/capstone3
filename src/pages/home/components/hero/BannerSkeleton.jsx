import Skeleton from "@/common/Skeleton";
import React from "react";

export default function BannerSkeleton() {
  return (
    <div role="status" aria-label="Đang tải sản nổi bật" className="w-full">
      <span className="sr-only">Đang tải sản phẩm nổi bật...</span>

      <div
        aria-hidden="true"
        className="flex h-64 items-center justify-center sm:h-80 lg:h-96"
      >
        <Skeleton className="h-36 w-4/5 -rotate-12 rounded-3xl sm:h-36 lg:h-44" />
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-8 right-10 flex max-w-[calc(100%-1.5rem)] items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 shadow-xl sm:bottom-10 sm:right-6"
      >
        <Skeleton className="size-9 shrink-0 rounded-full" />
        <div className="space-y-2">
          <div className="h-3 w-36 sm:-48" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>
    </div>
  );
}
