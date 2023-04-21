// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";
import { doExtraStyle } from "../../scripts/genAntdCss";
import { StyleProvider, createCache } from "@ant-design/cssinjs";

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
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
