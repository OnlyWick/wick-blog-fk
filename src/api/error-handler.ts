import { Notification } from "@douyinfe/semi-ui";

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
  Notification.open({
    content: "您还没有登录!",
  });
};

const handleOtherError = () => {
  // TODO: 错误上报
  console.log("其他错误");
};
