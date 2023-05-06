import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Button } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styled from "styled-components";

interface MarkdownPreviewProp {
  children: string;
}

const ArticleViewerCode = styled.div`
  position: relative;
`;
const ArticleViewerCodeAction = styled.div`
  position: absolute;
  right: 0;
  background-color: transparent;
  user-select: none;

  color: rgb(166, 226, 46);

  & > .ant-btn {
    color: rgb(166, 226, 46);
  }

  & > .ant-btn:hover {
    background-color: transparent;
    opacity: 0.7;
    color: rgb(166, 226, 46);
  }
`;

export default function MarkdownPreview(config: MarkdownPreviewProp) {
  return (
    <>
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <ArticleViewerCode>
                <ArticleViewerCodeAction>
                  <span>{match[1]}</span>
                  <Button type="text" ghost>
                    复制代码
                  </Button>
                </ArticleViewerCodeAction>
                <SyntaxHighlighter
                  {...props}
                  style={okaidia}
                  language={match[1]}
                  PreTag="div"
                  showLineNumbers={true}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </ArticleViewerCode>
            ) : (
              <code {...props} className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {config.children}
      </ReactMarkdown>
    </>
  );
}
