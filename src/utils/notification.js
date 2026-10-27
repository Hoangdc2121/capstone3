let messageApi = null;

export const setMessageApi = (api) => {
  messageApi = api;
};

export const notifySuccess = (text) => {
  return messageApi?.success(text);
};

export const notifyError = (text) => {
  return messageApi?.error(text);
};

export const notifyWarning = (text) => {
  return messageApi?.warning(text);
};
