import { AppProps } from "next/app";
import { StyleProvider } from "@ant-design/cssinjs";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import "../../public/reset.css";
import "../../public/wick-blog.css";

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
  return (
    <>
      <StyleProvider hashPriority="high">
        <GlobalStyle />
        <Component {...pageProps} />
      </StyleProvider>
    </>
  );
}
