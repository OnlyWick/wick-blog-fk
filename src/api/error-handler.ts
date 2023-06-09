import { notification } from "antd";

enum ProcessedState {
  Unauthorized = 401,
}

export const ErrorHandler = (status: number) => {
  switch (status) {
    case ProcessedState.Unauthorized:
      handleUnauthorized();
      break;
    default:
      handleOtherError();
  }
};

const handleUnauthorized = () => {
  notification.error({
    message: "您还没有登录!",
    placement: "top",
  });
};

const handleOtherError = () => {
  // TODO: 错误上报
  console.log("其他错误");
};
