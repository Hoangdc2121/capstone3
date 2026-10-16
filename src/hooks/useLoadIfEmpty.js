import { useEffect } from "react";
import useProductStore from "@/zustand/productStore";

export default function useLoadIfEmpty(dataKey, loadingKey, actionKey) {
  const loadData = useProductStore((state) => state[actionKey]);

  useEffect(() => {
    const state = useProductStore.getState();

    if (state[dataKey].length === 0 && !state[loadingKey]) {
      loadData();
    }
  }, [dataKey, loadingKey, loadData]);
}
