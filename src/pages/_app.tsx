import { AppProps } from "next/app";
import styled, { createGlobalStyle } from "styled-components";
import "../../public/reset.css";
import "../../public/wick-blog.css";
import "../../public/antd.min.css";
import Sidebar from "@/stories/Sidebar/Sidebar";
import { useRouter } from "next/router";
import Layout from "@/stories/Layout";
import Sider from "@/stories/Layout/Sider/Sider";
import Content from "@/stories/Layout/Content/Content";
import TopNav from "@/stories/TopNav/TopNav";
// import { Layout } from "antd";

// const { Content, Sider } = Layout;

const GlobalStyle = createGlobalStyle`
    :root, body {
        height: 100%;
    }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isRoot = router.pathname === "/";

  return (
    <>
      {isRoot ? (
        <Component {...pageProps} />
      ) : (
        <>
          <GlobalStyle />
          <Sidebar fullscreen={false}></Sidebar>
          {/* <TopNav></TopNav> */}
          <Layout style={{ width: "100%", alignItems: "center" }}>
            <Content
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 50px",
                maxWidth: "1280px",
                width: "100%",
              }}
            >
              <Component {...pageProps} />
            </Content>
          </Layout>
        </>
      )}
    </>
  );
}
