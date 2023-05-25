// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { doExtraStyle } from "../../scripts/genAntdCss";
import { StyleProvider, createCache } from "@ant-design/cssinjs";
import Script from "next/script";

// 解决 styled-components flicker
export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    const cache = createCache();
    let fileName = "";

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            (
              <StyleProvider cache={cache}>
                {sheet.collectStyles(<App {...props} />)}
              </StyleProvider>
            ),
        });

      const initialProps = await Document.getInitialProps(ctx);
      fileName = doExtraStyle({
        cache,
      });
      return {
        ...initialProps,

        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            {fileName && <link rel="stylesheet" href={`/${fileName}`} />}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang="zh" data-theme="light">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
    document.addEventListener(
      "touchmove",
      function (event) {
        if (event.scale !== 1) {
          event.preventDefault();
        }
      },
      { passive: false }
    );
    `,
            }}
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
