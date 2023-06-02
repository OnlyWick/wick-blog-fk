import { Button, Card, Popconfirm } from "antd";
import styled from "styled-components";
import UserInfo from "./Info/UserInfo";
import UserConnect from "./Connect";
import { CSSProperties } from "react";

const UserWidgetWrapper = styled.div``;

interface UserWidgetProps {
  style?: CSSProperties;
}

export default function UserWidget({ style }: UserWidgetProps) {
  return (
    <UserWidgetWrapper style={style}>
      <Card>
        <UserInfo />
        <Popconfirm
          title="订阅"
          description="你还没登录, 是否需要登录?"
          placement="bottom"
          okText="确定"
          cancelText="取消"
        >
          <Button
            block
            style={{
              marginBottom: "var(--wick-medium-margin)",
            }}
          >
            订阅
          </Button>
        </Popconfirm>
        <UserConnect></UserConnect>
      </Card>
    </UserWidgetWrapper>
  );
}
