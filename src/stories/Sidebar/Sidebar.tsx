import { Button } from "antd";
import Intro from "./Intro";
import SiteConfig from "../SiteConfig";
import styled from "styled-components";
import Link from "next/link";

interface SidebarProps {
  fullscreen: boolean;
  username?: string;
  avatar?: string;
  motto?: string[];
  siteConfig?: {
    approve: string;
    copyright: string;
  };
}

interface SidebarWrapperProps {
  fullscreen?: boolean;
}
const SidebarWrapper = styled.div<SidebarWrapperProps>`
  ${(props) =>
    props.fullscreen
      ? `left: 0;
         top: 0;
         right: 0;
         bottom: 0;
         position: fixed;
         display: flex;
         justify-content: center;
         flex-direction: column;
        `
      : `
        padding-top: 200px;
        border-right: 1px solid #e3e8f7;
        width: 378px;
        position: static;`}
  background: #fff;
  height: 100%;
  align-items: center;
  box-sizing: border-box;
  position: fixed;
  transition: all 0.35s;
  left: ${(props) => (props.fullscreen ? "0" : "-378px")};
  @media screen and (min-width: 769px) {
    left: 0;
  }
`;

interface SidebarNavProps {
  fullscreen?: boolean;
}

const SidebarNav = styled.div<SidebarNavProps>`
  display: flex;
  flex-direction: ${(props) => (props.fullscreen ? "row" : "column")};
  align-items: center;
  justify-content: center;
`;

export default function Sidebar({ fullscreen, siteConfig }: SidebarProps) {
  return (
    <SidebarWrapper fullscreen={fullscreen}>
      <Intro></Intro>

      <SidebarNav fullscreen={fullscreen}>
        <Link href="/blog">
          <Button
            type="primary"
            style={{
              width: "100px",
              border: "none",
              backgroundColor: "#f1f1f1",
              color: "#313131",
              margin: "10px",
            }}
          >
            博客
          </Button>
        </Link>
        <Link href="/album">
          <Button
            style={{
              width: "100px",
              border: "none",
              backgroundColor: "#f1f1f1",
              color: "#313131",
              margin: "10px",
            }}
            ghost
          >
            照片集
          </Button>
        </Link>

        <Link href="/about">
          <Button
            style={{
              width: "100px",
              border: "none",
              backgroundColor: "#f1f1f1",
              color: "#313131",
              margin: "10px",
            }}
            ghost
          >
            关于
          </Button>
        </Link>
      </SidebarNav>
      <SiteConfig
        config={{
          approve: siteConfig?.approve,
          copyright: siteConfig?.copyright,
        }}
      ></SiteConfig>
    </SidebarWrapper>
  );
}
