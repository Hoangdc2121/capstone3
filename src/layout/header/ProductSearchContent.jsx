import { useEffect, useRef } from "react";
import { Input } from "antd";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import AppButton from "@/common/AppButton";
import useProductSearch from "@/hooks/useProductSearch";
import getProductImage from "@/utils/getProductImage";
import { AnimatePresence, motion } from "motion/react";

export default function ProductSearchContent({
  open,
  onClose,
  autoFocus = false,
}) {
  const inputRef = useRef(null);

  const {
    keywords,
    setKeywords,
    products,
    total,
    loading,
    error,
    handleSubmit,
  } = useProductSearch({
    enabled: open,
    onClose,
  });

  const hasKeywords = keywords.trim().length > 0;

  useEffect(() => {
    if (open && autoFocus) {
      inputRef.current?.focus();
    }
  }, [open, autoFocus]);

  return (
    <div>
      <form
        role="search"
        onSubmit={handleSubmit}
        className="flex items-center gap-3"
      >
        <Input.Search
          ref={inputRef}
          name="keywords"
          value={keywords}
          onChange={(event) => setKeywords(event.target.value)}
          aria-label="Tên sản phẩm cần tìm"
          placeholder="Tìm đôi giày của bạn..."
          autoComplete="off"
          allowClear
          size="large"
          className="min-w-0 flex-1"
        />
      </form>

      <AnimatePresence initial={false}>
        {hasKeywords && (
          <motion.div
            key="search-results"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: {
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: {
                duration: 0.2,
              },
            }}
            className="overflow-hidden"
          >
            <div className="mt-4 border-t border-border pt-4">
              {loading ? (
                <p
                  role="status"
                  className="py-6 text-center text-sm text-muted-foreground"
                >
                  Đang tìm sản phẩm...
                </p>
              ) : error ? (
                <p
                  role="alert"
                  className="py-6 text-center text-sm text-destructive"
                >
                  {error}
                </p>
              ) : products.length > 0 ? (
                <>
                  <p className="mb-5 text-xs font-semibold uppercase text-muted-foreground">
                    Gợi ý sản phẩm
                  </p>

                  <ul className="space-y-2">
                    {products.map((product) => {
                      const slug =
                        product.alias ||
                        product.name.trim().toLowerCase().replace(/\s+/g, "-");

                      return (
                        <li key={product.id}>
                          <Link
                            to={`/detail/${product.id}/${encodeURIComponent(slug)}`}
                            onClick={onClose}
                            className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-primary"
                          >
                            <span className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-surface-image p-2">
                              <img
                                src={getProductImage(product.image)}
                                alt=""
                                className="h-full w-full object-contain"
                              />
                            </span>

                            <div className="min-w-0 flex-1">
                              <p className="line-clamp-2 text-xs font-semibold uppercase text-foreground group-hover:text-primary">
                                {product.name}
                              </p>

                              <p className="mt-1 font-heading text-xl text-primary">
                                {product.price.toLocaleString("en-US")} $
                              </p>
                            </div>

                            <ArrowRight
                              aria-hidden="true"
                              className="size-4 shrink-0 text-primary"
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  <AppButton
                    htmlType="button"
                    className="mt-4 w-full"
                    onClick={() => handleSubmit()}
                  >
                    Xem tất cả kết quả ({total})
                  </AppButton>
                </>
              ) : (
                <p
                  role="status"
                  className="py-6 text-center text-sm text-muted-foreground"
                >
                  Không tìm thấy sản phẩm phù hợp.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
