import { useState } from "react";
import CategoryBar from "./components/CategoryBar";
import FeaturedProducts from "./components/FeaturedProducts";
import HeroBanner from "./components/HeroBanner";
import BrandBanner from "./components/BrandBanner";
import ProductCatalog from "./components/ProductCatalog";

export default function Home() {
  //# Ghép các khu vực thành trang chủ
  const [selectedCategory, setSelectedCategory] = useState("all");
  return (
    <div>
      <HeroBanner />
      <CategoryBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <FeaturedProducts selectedCategory={selectedCategory} />
      <BrandBanner />
      <ProductCatalog selectedCategory={selectedCategory} />
    </div>
  );
}
