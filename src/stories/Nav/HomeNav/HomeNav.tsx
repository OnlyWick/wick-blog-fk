import { Button } from "antd";
import Intro from "../../Sidebar/UserWidget/Info";
import styled from "styled-components";
import Link from "next/link";
import SiteConfig from "@/stories/SiteConfig";

interface HomeProps {
  username?: string;
  avatar?: string;
  motto?: string[];
  siteConfig?: {
    approve: string;
    copyright: string;
  };
}

const HomeNavWrapper = styled.div`
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: #fff;
  height: 100%;
  align-items: center;
  box-sizing: border-box;
  position: fixed;
  transition: all 0.35s;
`;

const HomeContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function HomeNav({ siteConfig }: HomeProps) {
  return (
    <HomeNavWrapper>
      <Intro></Intro>
      <HomeContent>
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
      </HomeContent>
      <SiteConfig
        config={{
          approve: siteConfig?.approve,
          copyright: siteConfig?.copyright,
        }}
      ></SiteConfig>
    </HomeNavWrapper>
  );
}
