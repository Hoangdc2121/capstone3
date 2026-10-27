import { App as AntdApp } from "antd";
import { useLayoutEffect } from "react";
import { setMessageApi } from "@/utils/notification";

export default function NotificationProvider({ children }) {
  const { message } = AntdApp.useApp();

  useLayoutEffect(() => {
    setMessageApi(message);

    return () => {
      setMessageApi(null);
    };
  }, [message]);

  return children;
}
