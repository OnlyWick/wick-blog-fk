import { AppProps } from "next/app";
import styled, { createGlobalStyle } from "styled-components";
import '../../public/globals.css'
import "../../public/reset.css";
import "../../public/wick-blog.css";
import "../../public/prose.css";
import "../../public/base.css";
// import "../../public/base.css";
import { useRouter } from "next/router";
import TopNav from "@/stories/Nav/TopNav/TopNav";
import { useEffect } from "react";
import Head from "next/head";

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
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 960px) {
    padding: 0 10px;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isRoot = router.pathname === "/";


  useEffect(() => {
    // TODO: 全局错误处理
    window.onerror = function (message, source, lineno, colno, error) { };
  });

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>
      {isRoot ? (
        <Component {...pageProps} />
      ) : (
        <>
          <GlobalStyle />
          <TopNav></TopNav>
          <div className="pt-16">
            <Component {...pageProps} />
          </div>
        </>
      )}
    </>
  );
}
