import { Checkbox } from "antd";
import { Trash2 } from "lucide-react";

import AppButton from "@/common/AppButton";
import useCartSummary from "@/hooks/useCartSummary";

export default function CartToolbar({
  items = [],
  onSelectAll,
  onRemoveSelected,
}) {
  const { selectedCount } = useCartSummary();
  const allSelected = items.length > 0 && selectedCount === items.length;
  const partiallySelected = selectedCount > 0 && selectedCount < items.length;

  return (
    <section className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface px-4 py-3 sm:px-5">
      <Checkbox
        checked={allSelected}
        indeterminate={partiallySelected}
        onChange={(event) => onSelectAll(event.target.checked)}
      >
        <span className="text-sm text-foreground">
          Chọn tất cả ({selectedCount}/{items.length})
        </span>
      </Checkbox>

      <AppButton
        type="text"
        size="small"
        disabled={selectedCount === 0}
        onClick={onRemoveSelected}
        icon={<Trash2 aria-hidden="true" className="size-4" />}
        className="text-destructive! normal-case! enabled:hover:bg-destructive/10! disabled:opacity-40"
      >
        Xóa mục đã chọn
      </AppButton>
    </section>
  );
}
