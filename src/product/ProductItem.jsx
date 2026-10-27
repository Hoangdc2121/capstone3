import AppButton from "@/common/AppButton";
import FavoriteButton from "@/common/FavoriteButton";
import { Link, useNavigate } from "react-router-dom";
import ProductBadge from "./ProductBadge";
import getProductImage from "@/utils/getProductImage";

export default function ProductItem({
  products,
  showStock = false,
  showPrice = true,
}) {
  // # Hiển thị một sản phẩm
  const navigate = useNavigate();
  const slug =
    products.alias || products.name.trim().toLowerCase().replace(/\s+/g, "-");

  const detailUrl = `/detail/${products.id}/${encodeURIComponent(slug)}`;

  return (
    <article className="group mt-2 flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 motion-reduce:transform-none motion-reduce:transition-none">
      <div className="relative">
        <Link
          to={detailUrl}
          aria-label={`Xem chi tiết ${products.name}`}
          className="relative flex aspect-square items-center justify-center overflow-hidden bg-surface-image p-6 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
        >
          <ProductBadge
            products={products}
            showStock={showStock}
            className="absolute left-4 top-4 z-10"
          />
          <img
            src={getProductImage(products.image)}
            alt={products.name}
            loading="lazy"
            className="w-full h-full shrink-0 object-contain transition-transform duration-300 group-hover:-translate-y-2 group-hover:rotate-[-5deg] motion-reduce:transform-none motion-reduce:transition-none"
          />
        </Link>
        <FavoriteButton
          productId={products.id}
          productName={products.name}
          className="absolute! right-3 top-3 z-10"
        />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="min-h-12 text-base font-bold uppercase leading-6 text-card-foreground transition-colors duration-300 group-hover:text-primary">
          <Link to={detailUrl} className="line-clamp-2">
            {products.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {products.shortDescription}
        </p>
        <div className="mt-auto pt-4">
          <div className="border-t border-border pt-4">
            {showPrice && (
              <p className="font-heading text-3xl leading-none text-primary">
                {products.price.toLocaleString("en-US")} $
              </p>
            )}
            <AppButton
              className="mt-4 w-full"
              onClick={() => navigate(detailUrl)}
            >
              Xem chi tiết
            </AppButton>
          </div>
        </div>
      </div>
    </article>
  );
}
