import { VercelTabs } from "@/components/ui/vercel-tabs";
import useLoadIfEmpty from "@/hooks/useLoadIfEmpty";
import useProductStore from "@/zustand/productStore";
import { SlidersHorizontal } from "lucide-react";
import CategoryBarSkeleton from "./CategoryBarSkeleton";

export default function CategoryBar({
  selectedCategory = "all",
  onCategoryChange,
  showFeatured = false,
  isFeatured = false,
}) {
  const categories = useProductStore((state) => state.categories);
  const categoriesLoading = useProductStore((state) => state.categoriesLoading);
  const categoriesError = useProductStore((state) => state.categoriesError);
  useLoadIfEmpty("categories", "categoriesLoading", "getCategories");

  const categoryTabs = [
    {
      label: "Tất cả",
      value: "all",
    },
    ...(showFeatured ? [{ label: "Sản phẩm nổi bật", value: "featured" }] : []),
    ...categories
      .filter((category) => !category.deleted)
      .map((category) => ({
        label: category.category,
        value: category.id,
      })),
  ];
  return (
    <section aria-labelledby="category-title" className="pb-6">
      <div className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-5 lg:flex-row lg:items-center lg:gap-8 lg:p-6">
        <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary shadow-sm">
          <SlidersHorizontal arria-hidden="true" className="size-5" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Khám phá sneaker
          </p>
          <h2 className="mt-2 font-heading text-2xl leading-none text-foreground uppercase">
            Chọn bộ sưu tập
          </h2>
        </div>
        <div className="min-w-0 flex-1">
          {categoriesLoading && categories.length === 0 ? (
            <CategoryBarSkeleton />
          ) : (
            <VercelTabs
              tabs={categoryTabs}
              activeTab={
                showFeatured && isFeatured && selectedCategory === "all"
                  ? "featured"
                  : selectedCategory
              }
              mode="selection"
              showUnderline={false}
              onValueChange={onCategoryChange}
              ariaLabel="Lọc sản phẩm"
              className="overflow-x-auto p-1"
            />
          )}

          {categoriesError && (
            <p role="alert" className="mt-2 text-sm text-destructive">
              {categoriesError}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
