import Skeleton from "@/common/Skeleton";

export default function ProfileSkeleton() {
  return (
    <div
      role="status"
      aria-label="Đang tải thông tin tài khoản"
      className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]"
    >
      <div className="rounded-2xl border border-border bg-surface p-5">
        <div className="flex flex-col items-center">
          <Skeleton className="size-18 rounded-full" />
          <Skeleton className="mt-4 h-5 w-32" />
          <Skeleton className="mt-2 h-4 w-44 max-w-full" />
        </div>

        <div className="mt-6 space-y-3 border-t border-border pt-5">
          {Array.from({ length: 3 }, (_, index) => (
            <Skeleton key={index} className="h-12 w-full rounded-xl" />
          ))}
        </div>

        <div className="mt-6 border-t border-border pt-5">
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      </div>

      <div className="min-w-0 rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <Skeleton className="h-8 w-52 max-w-full" />
        <Skeleton className="mt-3 h-4 w-72 max-w-full" />

        <div className="mt-5 grid gap-6 border-t border-border pt-6 sm:grid-cols-2">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-11 w-full rounded-lg" />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t border-border pt-5">
          <Skeleton className="h-11 w-24 rounded-xl" />
          <Skeleton className="h-11 w-32 rounded-xl" />
        </div>
      </div>

      <span className="sr-only">Đang tải thông tin tài khoản...</span>
    </div>
  );
}
