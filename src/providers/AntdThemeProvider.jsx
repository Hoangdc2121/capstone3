import { useTheme } from "@/hooks/useTheme";
import { ConfigProvider, theme } from "antd";

export default function AntdThemeProvider({ children }) {
  // Nhận theme từ provider riêng
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <ConfigProvider
      theme={{
        // Đồng bộ chế độ sáng / tối
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,

        token: {
          // Font cho các component Ant Design
          fontFamily: '"Inter", sans-serif',

          // Màu thương hiệu
          colorPrimary: "#E98668",
          colorInfo: "#E98668",

          // Nền trang, khối nội dung và menu nổi
          colorBgLayout: isDark ? "#000000" : "#FFF7F3",
          colorBgContainer: isDark ? "#151515" : "#FFFFFF",
          colorBgElevated: isDark ? "#151515" : "#FFFFFF",

          // Chữ chính và chữ mô tả
          colorText: isDark ? "#F7F2EE" : "#2D2430",
          colorTextSecondary: isDark ? "#BFB6B1" : "#6D606A",

          // Đường viền
          colorBorder: isDark ? "#383838" : "#EADBD8",
          colorBorderSecondary: isDark ? "#383838" : "#EADBD8",

          // Trạng thái lỗi
          colorError: isDark ? "#EF7180" : "#D94B59",

          // Bo góc 10px
          borderRadius: 10,
          borderRadiusLG: 10,

          // Chiều cao component size="large"
          controlHeightLG: 48,
        },

        components: {
          Button: {
            // Nút chính: nền coral, chữ trắng
            colorPrimary: "#E98668",
            colorPrimaryHover: "#DA7658",
            colorPrimaryActive: "#C96548",
            primaryColor: "#FFFFFF",
            colorTextLightSolid: "#FFFFFF",

            // Nút mặc định khi hover
            defaultHoverBg: isDark ? "#322521" : "#F8E3DC",
            defaultHoverColor: isDark ? "#E98668" : "#2D2430",
            defaultHoverBorderColor: "#E98668",

            // Nút mặc định khi nhấn
            defaultActiveBg: isDark ? "#322521" : "#F8E3DC",
            defaultActiveColor: isDark ? "#E98668" : "#2D2430",
            defaultActiveBorderColor: "#DA7658",

            // Độ đậm chữ
            fontWeight: 600,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
