import { AppProps } from "next/app";
import styled, { createGlobalStyle } from "styled-components";
import "../../public/reset.css";
import "../../public/wick-blog.css";
import "../../public/antd.min.css";
import { useRouter } from "next/router";
import Layout from "@/stories/Layout";
import Sider from "@/stories/Layout/Sider/Sider";
import Content from "@/stories/Layout/Content/Content";
import TopNav from "@/stories/Nav/TopNav/TopNav";
import Header from "@/stories/Layout/Header/Header";
import { Affix } from "antd";
import HomeNav from "@/stories/Nav/HomeNav";
// import { Header } from "antd/es/layout/layout";

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

  @media screen and (max-width: 959px) {
    padding: 0;
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
          <HeaderWrapper>
            <Affix
              style={{
                background: "#fff",
              }}
            >
              <Header>
                <TopNav></TopNav>
              </Header>
            </Affix>
          </HeaderWrapper>
          <Layout style={{ width: "100%" }}>
            <MainContainer>
              <Content
                style={{
                  maxWidth: "1280px",
                  margin: "var(--wick-large-margin)",
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
