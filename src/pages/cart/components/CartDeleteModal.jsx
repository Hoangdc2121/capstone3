import AppButton from "@/common/AppButton";
import { Modal } from "antd";
import { Trash2 } from "lucide-react";

export default function CartDeleteModal({
  open,
  count,
  onClose,
  onConfirm,
  productName,
}) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      centered
      width={480}
      footer={null}
      closable={false}
      aria-labelledby="cart-delete-title"
    >
      <div className="p-2 sm:p-3">
        <span className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <Trash2 aria-hidden="true" className="size-6" />
        </span>

        <h2
          id="cart-delete-title"
          className="mt-5 text-lg font-bold text-foreground"
        >
          Xác nhận xóa sản phẩm
        </h2>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {count === 1
            ? `Bạn có chắc chắn muốn xóa "${productName}" khỏi giỏ hàng?`
            : `Bạn có chắc chắn muốn xóa ${count} mặt hàng đã chọn khỏi giỏ hàng?`}
        </p>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <AppButton
            type="default"
            className="w-full normal-case!"
            onClick={onClose}
          >
            Hủy bỏ
          </AppButton>

          <AppButton
            danger
            className="cart-delete-confirm w-full normal-case!"
            onClick={onConfirm}
          >
            Xác nhận xóa
          </AppButton>
        </div>
      </div>
    </Modal>
  );
}
