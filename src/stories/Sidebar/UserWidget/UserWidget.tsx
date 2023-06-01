import { Card } from "antd";
import styled from "styled-components";
import UserInfo from "./Info/UserInfo";

const UserWidgetWrapper = styled.div``;

export default function UserWidget() {
  return (
    <UserWidgetWrapper>
      <Card>
        <UserInfo />
      </Card>
    </UserWidgetWrapper>
  );
}
