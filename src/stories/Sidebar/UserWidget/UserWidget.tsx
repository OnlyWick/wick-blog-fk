import { Card, Popconfirm, Button } from '@douyinfe/semi-ui'
import styled from "styled-components";
import UserInfo from "./Info/UserInfo";
import UserConnect from "./Connect";
import { CSSProperties } from "react";

interface UserWidgetProps {
  style?: CSSProperties;
}

export default function UserWidget({ style }: UserWidgetProps) {

  return (
    <div style={style}>
      <Card>
        <UserInfo />
        <Popconfirm
          title="订阅"
          content="你还没登录, 是否需要登录?"
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
    </div>
  );
}
