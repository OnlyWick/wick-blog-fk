import { AppProps } from "next/app";
import styled, { createGlobalStyle } from "styled-components";
import "../../public/reset.css";
import "../../public/wick-blog.css";
import "../../public/antd.min.css";
import { useRouter } from "next/router";
import TopNav from "@/stories/Nav/TopNav/TopNav";
import { Affix, Layout } from "antd";
import { useEffect } from "react";
const { Header, Content } = Layout;

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

const HeaderWrapper = styled.div`
  transition: all 0.35s;
  & .ant-affix > header {
    outline: 1px solid #eee;
  }

  & .ant-affix > header > div {
    background-color: #fff;
  }

  @media screen and (min-width: 960px) {
    display: none;
  }
`;

const MainContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  transition: all 0.35s;
  display: flex;
  justify-content: center;

  @media screen and (min-width: 960px) {
    padding: 0 10px;
  }

  & > .ant-layout-content {
    max-width: 1280px;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isRoot = router.pathname === "/";

  useEffect(() => {
    // TODO: 全局错误处理
    window.onerror = function (message, source, lineno, colno, error) {};
  });

  return (
    <>
      {isRoot ? (
        <Component {...pageProps} />
      ) : (
        <>
          <GlobalStyle />
          <HeaderWrapper>
            <Affix
              style={{
                background: "#fff",
              }}
            >
              <Header
                style={{
                  padding: 0,
                  background: "transparent",
                }}
              >
                <TopNav></TopNav>
              </Header>
            </Affix>
          </HeaderWrapper>
          <Layout style={{ width: "100%" }}>
            <MainContainer>
              <Content>
                <Component {...pageProps} />
              </Content>
            </MainContainer>
          </Layout>
        </>
      )}
    </>
  );
}
