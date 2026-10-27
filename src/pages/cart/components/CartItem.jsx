import AppButton from "@/common/AppButton";
import getProductImage from "@/utils/getProductImage";
import { Checkbox, Select } from "antd";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import productApi from "@/services/productService";
import { notifyError } from "@/utils/notification";
import useCartStore from "@/zustand/cartStore";

export default function CartItem({
  item,
  onSelect,
  onQuantityChange,
  onRemove,
  updating = false,
  quantityUpdating = false,
  showCheckbox = true,
}) {
  const slug =
    item.alias || item.name.trim().toLowerCase().replace(/\s+/g, "-");
  const detailUrl = `/detail/${item.productId}/${encodeURIComponent(slug)}`;

  const [sizes, setSizes] = useState([]);
  const [sizesLoading, setSizesLoading] = useState(false);
  const [sizeUpdating, setSizeUpdating] = useState(false);
  const sizeBusyRef = useRef(false);

  const handleOpenSizes = async (open) => {
    if (!open || sizesLoading || sizes.length > 0) return;

    setSizesLoading(true);

    try {
      const res = await productApi.getProducById(item.productId);
      const product = res.data.content;
      console.log("Danh sách size từ API:", product.size);

      setSizes(Array.isArray(product.size) ? product.size.map(String) : []);
    } catch (error) {
      notifyError(
        error.response?.data?.message ||
          error.message ||
          "Không thể lấy danh sách size.",
      );
    } finally {
      setSizesLoading(false);
    }
  };

  const handleSizeChange = async (size) => {
    if (
      sizeBusyRef.current ||
      quantityUpdating ||
      String(size) === String(item.size)
    ) {
      return;
    }

    sizeBusyRef.current = true;
    setSizeUpdating(true);

    try {
      // Kiểm tra lại size và tồn kho hiện tại trước khi đổi
      const res = await productApi.getProducById(item.productId);

      useCartStore.getState().changeSize(item.cartId, size, res.data.content);
    } catch (error) {
      notifyError(
        error.response?.data?.message || error.message || "Không thể đổi size.",
      );
    } finally {
      sizeBusyRef.current = false;
      setSizeUpdating(false);
    }
  };

  return (
    <article className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4 sm:gap-4 sm:p-5">
      {showCheckbox && (
        <Checkbox
          checked={item.selected}
          onChange={(e) => onSelect(item.cartId, e.target.checked)}
          aria-label={`Chọn ${item.name}, size ${item.size}`}
          className="mt-1"
        />
      )}

      <Link
        to={detailUrl}
        className="flex size-20 shrink-0 items-center justify-center rounded-xl bg-surface-image p-2 sm:size-24"
      >
        <img
          src={getProductImage(item.image)}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              to={detailUrl}
              className="line-clamp-2 text-sm font-bold uppercase text-foreground! transition-colors hover:text-primary!"
            >
              {item.name}
            </Link>

            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <Select
                aria-label={`Chọn size cho ${item.name}`}
                value={String(item.size)}
                className="min-w-28"
                loading={sizesLoading || sizeUpdating}
                disabled={quantityUpdating || sizeUpdating}
                onOpenChange={handleOpenSizes}
                onChange={handleSizeChange}
                options={sizes.map((size) => ({
                  label: `Size ${size}`,
                  value: String(size),
                }))}
                notFoundContent={
                  sizesLoading ? "Đang tải size..." : "Chưa có thông tin size."
                }
              />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Đơn giá: {item.price.toLocaleString("en-US")} $
            </p>
          </div>

          <AppButton
            type="text"
            size="small"
            aria-label={`Xóa ${item.name}, size ${item.size}`}
            onClick={() => onRemove(item.cartId)}
            className="size-8! shrink-0 p-0! text-muted-foreground! hover:bg-destructive/10! hover:text-destructive!"
            icon={<Trash2 aria-hidden="true" className="size-4" />}
          />
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <div
            role="group"
            aria-label={`Số lượng ${item.name}, size ${item.size}`}
            className="inline-flex items-center rounded-xl border border-border bg-background p-1"
          >
            <AppButton
              type="text"
              size="small"
              aria-label="Giảm số lượng"
              disabled={quantityUpdating || item.quantity <= 1}
              onClick={() => onQuantityChange(item.cartId, item.quantity - 1)}
              className="size-8! p-0!"
              icon={<Minus aria-hidden="true" className="size-3.5" />}
            />

            <span
              aria-live="polite"
              aria-busy={updating}
              className="min-w-9 text-center text-sm font-semibold tabular-nums text-foreground"
            >
              {updating ? "..." : item.quantity}
            </span>

            <AppButton
              type="text"
              size="small"
              aria-label="Tăng số lượng"
              disabled={quantityUpdating}
              onClick={() => onQuantityChange(item.cartId, item.quantity + 1)}
              className="size-8! p-0!"
              icon={<Plus aria-hidden="true" className="size-3.5" />}
            />
          </div>

          <p className="font-heading text-2xl leading-none text-primary">
            {(item.price * item.quantity).toLocaleString("en-US")} $
          </p>
        </div>
      </div>
    </article>
  );
}
