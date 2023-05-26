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
import TopNav from "@/stories/Nav/TopNav/TopNav";
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

const MainContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  transition: all 0.35s;
  display: flex;
  justify-content: center;

  @media screen and (min-width: 769px) {
    padding: 0 50px;
  }

  @media screen and (max-width: 768px) {
    padding: 0 10px;
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
          <Layout style={{ width: "100%" }}>
            <MainContainer>
              <Content
                style={{
                  maxWidth: "1280px",
                  overflow: "auto",
                  padding: "6px",
                }}
              >
                <Component {...pageProps} />
              </Content>
            </MainContainer>
          </Layout>
        </>
      )}
    </>
  );
}
