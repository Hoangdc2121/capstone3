import { message } from "antd";

//  # Hàm thông báo success / error / warning
export const notifySuccess = (text) => {
  message.success(text);
};

export const notifyError = (text) => {
  message.error(text);
};

export const notifyWarning = (text) => {
  message.warning(text);
};
