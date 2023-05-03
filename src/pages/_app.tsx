import { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";
import "../../public/reset.css";
import "../../public/wick-blog.css";
import "../../public/antd.min.css";
import Sidebar from "@/stories/Sidebar/Sidebar";
import { useRouter } from "next/router";
import Layout from "@/stories/Layout";
import Sider from "@/stories/Layout/Sider/Sider";
import Content from "@/stories/Layout/Content/Content";

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
          <Layout style={{ height: "100%" }}>
            <Sider>
              <Sidebar fullscreen={false}></Sidebar>
            </Sider>
            <Layout>
              <Content style={{ padding: "0 50px" }}>
                <Component {...pageProps} />
              </Content>
            </Layout>
          </Layout>
        </>
      )}
    </>
  );
}
