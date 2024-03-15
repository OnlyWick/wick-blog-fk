// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="zh">
        <Head>
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
        <body className="text-gray-700 dark:text-gray-200">
          <Main />
          <NextScript />
        </body>
      </Html >
    );
  }
}
