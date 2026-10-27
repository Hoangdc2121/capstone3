import { useTheme } from "@/hooks/useTheme";
import { ConfigProvider, theme } from "antd";

export default function AntdThemeProvider({ children }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,

        token: {
          fontFamily: '"Inter", sans-serif',
          colorPrimary: "#E98668",
          colorInfo: "#E98668",
          colorBgLayout: isDark ? "#000000" : "#FFF7F3",
          colorBgContainer: isDark ? "#151515" : "#FFFFFF",
          colorBgElevated: isDark ? "#151515" : "#FFFFFF",
          colorText: isDark ? "#F7F2EE" : "#2D2430",
          colorTextSecondary: isDark ? "#BFB6B1" : "#6D606A",
          colorBorder: isDark ? "#383838" : "#EADBD8",
          colorBorderSecondary: isDark ? "#383838" : "#EADBD8",
          colorError: isDark ? "#EF7180" : "#D94B59",
          borderRadius: 10,
          borderRadiusLG: 10,
          controlHeightLG: 48,
        },

        components: {
          Button: {
            colorPrimary: "#E98668",
            colorPrimaryHover: "#DA7658",
            colorPrimaryActive: "#C96548",
            primaryColor: "#FFFFFF",
            colorTextLightSolid: "#FFFFFF",
            defaultHoverBg: isDark ? "#322521" : "#F8E3DC",
            defaultHoverColor: isDark ? "#E98668" : "#2D2430",
            defaultHoverBorderColor: "#E98668",
            defaultActiveBg: isDark ? "#322521" : "#F8E3DC",
            defaultActiveColor: isDark ? "#E98668" : "#2D2430",
            defaultActiveBorderColor: "#DA7658",
            fontWeight: 600,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
