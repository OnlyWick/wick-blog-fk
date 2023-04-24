import { Button, Drawer, SiderProps } from "antd";
import Intro from "./Intro";
import SiteConfig from "../SiteConfig";
import { useState } from "react";
import styled from "styled-components";
import { NodeNextRequest } from "next/dist/server/base-http/node";

interface SidebarProps {
  username: string;
  avatar: string;
  motto: string[];
  siteConfig: {
    approve: string;
    copyright: string;
  };
}

const Overlay = styled.div`
  height: 300px;
  overflow: hidden;
  color: #000;
`;

export default function Sidebar(config?: Partial<SidebarProps>) {
  const [switchPage, setSwitchPage] = useState(false);
  const handleClick = function () {
    setSwitchPage(!switchPage);
  };

  return (
    <Drawer
      open={true}
      closable={false}
      placement="left"
      bodyStyle={{
        padding: 0,
        // background: "linear-gradient(to bottom, #17ead9, #6078ea)",
        background: "#313131",
      }}
      width={switchPage ? "378px" : "100%"}
      mask={false}
    >
      <Overlay></Overlay>
      <Intro></Intro>

      <nav style={{ display: "flex", flexDirection: "column" }}>
        <Button
          type="primary"
          style={{
            border: "none",
            backgroundColor: "#f1f1f1",
            color: "#313131",
          }}
          onClick={handleClick}
          // ghost
        >
          博客
        </Button>
        <Button onClick={handleClick} ghost>
          照片集
        </Button>
        <Button onClick={handleClick} ghost>
          关于
        </Button>
      </nav>
      <SiteConfig
        config={{
          approve: config?.siteConfig?.approve,
          copyright: config?.siteConfig?.copyright,
        }}
      ></SiteConfig>
    </Drawer>
  );
}
