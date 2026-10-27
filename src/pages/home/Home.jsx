import { useState } from "react";
import FeaturedProducts from "./components/FeaturedProducts";
import BrandBanner from "./components/BrandBanner";
import ProductCatalog from "./components/ProductCatalog";
import HeroBanner from "./components/hero/HeroBanner";
import CategoryBar from "./components/categoryBar/CategoryBar";

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
