import { useEffect, useLayoutEffect, useState } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";

const STORAGE_KEY = "theme";

// Đọc theme đã lưu
function getInitialTheme() {
  try {
    const savedTheme = localStorage.getItem(STORAGE_KEY);

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
  } catch {
    // Không đọc được thì dùng light
  }

  return "light";
}

// Đồng bộ class trên thẻ html với CSS
function applyTheme(theme) {
  const root = document.documentElement;

  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
}

export default function ThemeProvider({ children }) {
  const [theme, updateTheme] = useState(getInitialTheme);

  // Áp dụng theme trước khi vẽ giao diện
  useLayoutEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Đổi theme và lưu lựa chọn
  const setTheme = (nextTheme) => {
    if (nextTheme !== "light" && nextTheme !== "dark") return;

    applyTheme(nextTheme);
    updateTheme(nextTheme);

    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // Vẫn đổi theme nếu không lưu được
    }
  };

  // Đồng bộ theme giữa các tab
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key !== STORAGE_KEY) return;

      const nextTheme = event.newValue === "dark" ? "dark" : "light";

      applyTheme(nextTheme);
      updateTheme(nextTheme);
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme: theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
