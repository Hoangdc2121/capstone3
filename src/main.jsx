import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import ThemeProvider from "./providers/ThemeProvider.jsx";
import AntdThemeProvider from "./providers/AntdThemeProvider.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <AntdThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AntdThemeProvider>
  </ThemeProvider>,
);
