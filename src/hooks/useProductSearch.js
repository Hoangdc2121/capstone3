// # search sản phẩm loading, error

import productApi from "@/services/productService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useProductSearch({ enabled = true, onClose } = {}) {
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState("");
  const [searchResult, setSearchResult] = useState({
    keyword: "",
    products: [],
    total: 0,
    loading: false,
    error: null,
  });

  const trimmedKeywords = keywords.trim();

  useEffect(() => {
    if (!enabled || !trimmedKeywords) return;
    let cancelled = false;

    const timeoutId = setTimeout(async () => {
      setSearchResult({
        keyword: trimmedKeywords,
        products: [],
        total: 0,
        loading: true,
        error: null,
      });

      try {
        const res = await productApi.getPaging(1, 5, trimmedKeywords);
        const content = res.data.content;

        if (cancelled) return;
        setSearchResult({
          keyword: trimmedKeywords,
          products: content.items,
          total: content.totalRow,
          loading: false,
          error: null,
        });
      } catch (error) {
        if (cancelled) return;

        setSearchResult({
          keyword: trimmedKeywords,
          products: [],
          total: 0,
          loading: false,
          error:
            error.response?.data?.message ||
            error.message ||
            "Không thể tìm sản phẩm.",
        });
      }
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [trimmedKeywords, enabled]);

  const resultMatches =
    enabled &&
    trimmedKeywords !== "" &&
    searchResult.keyword === trimmedKeywords;

  const handleSubmit = (event) => {
    event?.preventDefault();

    if (!trimmedKeywords) return;

    navigate(`/shop?keywords=${encodeURIComponent(trimmedKeywords)}`);
    onClose?.();
  };

  return {
    keywords,
    setKeywords,
    products: resultMatches ? searchResult.products : [],
    total: resultMatches ? searchResult.total : 0,
    loading:
      enabled &&
      trimmedKeywords !== "" &&
      (!resultMatches || searchResult.loading),
    error: resultMatches ? searchResult.error : null,
    handleSubmit,
  };
}
