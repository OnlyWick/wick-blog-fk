import { MailOutlined, AppstoreOutlined } from "@ant-design/icons";
import { MenuProps, Menu } from "antd";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

const items: MenuProps["items"] = [
  {
    label: <Link href="/blog">博客</Link>,
    key: "mail",
    icon: <MailOutlined />,
  },
  {
    label: <Link href="/album">照片集</Link>,
    key: "app",
    icon: <AppstoreOutlined />,
  },
  {
    label: "关于",
    key: "app1",
    icon: <AppstoreOutlined />,
  },
];

const TopNavWrapper = styled.div``;

const TopNav: React.FC = () => {
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <TopNavWrapper>
      <Menu
        style={
          {
            // backgroundColor: "transparent",
          }
        }
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </TopNavWrapper>
  );
};

export default TopNav;
