import authApi from "@/services/authService";
import { notifyError } from "@/utils/notification";
import { tr } from "motion/react-client";
import { create } from "zustand";
import useFavorite from "./favoriteStore";

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

  // ĐĂNG XUẤT
  logout: () => {
    localStorage.removeItem("accessToken");
    set({
      user: null,
      accessToken: null,
      ischeckingAuth: false,
      profileError: null,
      signInError: null,
      signUpError: null,
    });
  },

  clearAuthErrors: () => {
    set({
      signInError: null,
      signUpError: null,
    });
  },
}));

export default useAuthStore;
