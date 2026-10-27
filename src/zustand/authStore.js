import authApi from "@/services/authService";
import { notifyError } from "@/utils/notification";
import { create } from "zustand";
import useFavorite from "./favoriteStore";
import useCartStore from "./cartStore";

const getErrorMessage = (error) =>
  error.response?.data?.message ||
  error.message ||
  "Không thể thực hiện yêu cầu.";

const getSavedToken = () => {
  try {
    return localStorage.getItem("accessToken");
  } catch {
    return null;
  }
};

const useAuthStore = create((set, get) => ({
  user: null,
  accessToken: getSavedToken(),

  // ĐĂNG NHẬP
  signInLoading: false,
  signInError: null,

  signIn: async (obj) => {
    set({
      signInLoading: true,
      signInError: null,
    });

    try {
      const res = await authApi.signIn({
        email: obj.email,
        password: obj.password,
      });

      const accessToken = res.data.content?.accessToken;
      if (!accessToken) {
        throw new Error("API đăng nhập không trả về accessToken.");
      }

      localStorage.setItem("accessToken", accessToken);
      set({
        accessToken,
        user: null,
      });

      await get().getProfile();
      return res.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      set({ signInError: errorMessage });
      notifyError(errorMessage);
      throw error;
    } finally {
      set({ signInLoading: false });
    }
  },

  // ĐĂNG KÝ
  signUpLoading: false,
  signUpError: null,

  signUp: async (obj) => {
    set({
      signUpLoading: true,
      signUpError: null,
    });
    try {
      const res = await authApi.signUp({
        id: 0,
        email: obj.email,
        password: obj.password,
        name: obj.name,
        gender: obj.gender,
        phone: obj.phone,
      });
      return res.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      set({ signUpError: errorMessage });
      notifyError(errorMessage);
      throw error;
    } finally {
      set({ signUpLoading: false });
    }
  },

  ischeckingAuth: true,
  profileLoading: false,
  profileError: null,

  getProfile: async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      set({
        user: null,
        accessToken: null,
        ischeckingAuth: false,
        profileLoading: false,
        profileError: null,
      });
      return;
    }

    set({
      ischeckingAuth: true,
      profileLoading: true,
      profileError: null,
    });

    try {
      const res = await authApi.getProfile();
      set({
        user: res.data.content,
        accessToken,
      });

      await useFavorite.getState().getFavoriteProducts();
    } catch (error) {
      set({
        user: null,
        profileError: getErrorMessage(error),
      });
    } finally {
      set({
        profileLoading: false,
        ischeckingAuth: false,
      });
    }
  },

  // CẬP NHẬT THÔNG TIN CÁ NHÂN
  updateProfileLoading: false,
  updateProfileError: null,

  updateProfile: async ({ name, phone, gender }) => {
    if (get().updateProfileLoading) return;

    const currentUser = get().user;

    set({
      updateProfileLoading: true,
      updateProfileError: null,
    });

    try {
      if (!currentUser) {
        throw new Error("Vui lòng đăng nhập để cập nhật thông tin.");
      }

      const values = {
        name: name.trim(),
        phone: phone.trim(),
        gender,
      };

      const res = await authApi.updateProfile({
        id: currentUser.id,
        email: currentUser.email,
        ...values,
      });

      // Chỉ cập nhật nếu vẫn đang ở phiên đăng nhập ban đầu
      if (get().user?.email === currentUser.email && get().accessToken) {
        set((state) => ({
          user: {
            ...state.user,
            ...values,
          },
        }));
      }

      return res.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error);

      set({
        updateProfileError: errorMessage,
      });

      notifyError(errorMessage);
      throw error;
    } finally {
      set({
        updateProfileLoading: false,
      });
    }
  },

  clearUpdateProfileError: () => {
    set({
      updateProfileError: null,
    });
  },

  // ĐĂNG XUẤT
  logout: () => {
    localStorage.removeItem("accessToken");

    // Đăng xuất thì xóa giỏ hàng
    useCartStore.getState().clearCart();
    useFavorite.getState().resetFavorites();

    set({
      user: null,
      accessToken: null,
      ischeckingAuth: false,
      profileError: null,
      signInError: null,
      signUpError: null,
      updateProfileError: null,
    });
  },
}));

export default useAuthStore;
