export default function validateProductSelection({
  product,
  size,
  quantity = 1,
}) {
  const selectedSize = String(size ?? "").trim();
  const amount = Number(quantity);
  const stock = Math.max(0, Math.floor(Number(product.quantity) || 0));

  const sizes = Array.isArray(product.size) ? product.size.map(String) : [];

  if (!selectedSize || !sizes.includes(selectedSize)) {
    throw new Error("Vui lòng chọn size giày hợp lệ.");
  }

  if (!Number.isInteger(amount) || amount < 1) {
    throw new Error("Số lượng không hợp lệ.");
  }

  if (amount > stock) {
    throw new Error(`Sản phẩm chỉ còn ${stock} đôi.`);
  }

  return { selectedSize, amount, stock };
}
