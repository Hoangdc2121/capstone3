// Chuyển danh mục sản phẩm thành mảng
export default function getProductCategories(categories) {
  if (Array.isArray(categories)) return categories;

  try {
    const parsed = JSON.parse(categories || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
