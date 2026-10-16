import getProductCategories from "./getProductCategories";

// Lọc sản phẩm
export default function filterProductsByCategory(
  products,
  selectedCategory = "all",
) {
  if (selectedCategory === "all") return products;

  return products.filter((product) => {
    const categories = getProductCategories(product.categories);

    return categories.some((category) => category.id === selectedCategory);
  });
}
