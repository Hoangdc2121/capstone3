import orderApi from "@/services/orderService";
import { notifyError } from "@/utils/notification";
import { create } from "zustand";

const getErrorMessage = (error) =>
  error.response?.data?.message ||
  error.message ||
  "Không thể đặt hàng. Vui lòng thử lại.";

const useOrderStore = create((set, get) => ({
  orderLoading: false,
  orderError: null,
  orderResult: null,

  createOrder: async (data) => {
    // chặn gửi lặp lại khi yêu cầu trước chưa hoàn thành
    if (get().orderLoading) return;

    set({ orderLoading: true, orderError: null, orderResult: null });

    try {
      const res = await orderApi.createOrder(data);
      set({
        orderResult: res.data,
      });
      return res.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      set({ orderError: errorMessage });
      notifyError(errorMessage);
      throw error;
    } finally {
      set({ orderLoading: false });
    }
  },

  resetOrder: () => {
    set({
      orderError: null,
      orderResult: null,
    });
  },
}));
export default useOrderStore;
