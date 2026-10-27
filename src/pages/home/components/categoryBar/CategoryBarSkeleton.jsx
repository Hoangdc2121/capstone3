import Skeleton from "@/common/Skeleton";
import React from "react";

export default function CategoryBarSkeleton() {
  return (
    <div
      role="status"
      aria-label="Đang tải danh mục"
      className="flex gap-2 overflow-hidden p-1"
    >
      <span className="sr-only">Đang tải danh mục...</span>
      {Array.from({ length: 6 }, (_, index) => (
        <Skeleton key={index} className="h-10 w-24 shrink-0 rounded-xl" />
      ))}
    </div>
  );
}
