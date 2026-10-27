import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App as AntdApp } from "antd";

import App from "./App.jsx";
import ThemeProvider from "./providers/ThemeProvider.jsx";
import AntdThemeProvider from "./providers/AntdThemeProvider.jsx";
import NotificationProvider from "./providers/NotificationProvider.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <AntdThemeProvider>
      <AntdApp>
        <NotificationProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </NotificationProvider>
      </AntdApp>
    </AntdThemeProvider>
  </ThemeProvider>,
);
