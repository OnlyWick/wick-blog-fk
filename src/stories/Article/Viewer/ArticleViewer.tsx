import { Button, Card, Divider, Tag } from "antd";
import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "styled-components";

const ArticleViewerWrapper = styled.div``;

const ArticleViewerHeader = styled.div``;
const ArticleViewerBaseInfo = styled.div`
  color: #bdbdbd;
`;
const ArticleViewerTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 4px;
`;
const ArticleViewerBody = styled.div``;
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

interface ArticleViewerProps {
  children: ReactNode;
}

export default function ArticleViewer({ children }: ArticleViewerProps) {
  const markdown: string = localStorage.getItem("article")!;
  return (
    <Card>
      <ArticleViewerHeader>
        <ArticleViewerTitle>如何正确摸鱼</ArticleViewerTitle>
        <ArticleViewerBaseInfo>
          <span>2023年4月22日01:39</span>
          <Divider type="vertical"></Divider>
          <span>阅读 999</span>
          <Divider type="vertical"></Divider>
          <Tag color="orange">前端</Tag>
          <Tag color="orange">后端</Tag>
          <Tag color="orange">React</Tag>
          <Tag color="orange">Vue</Tag>
        </ArticleViewerBaseInfo>
      </ArticleViewerHeader>
      <ArticleViewerBody>
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
          {markdown}
        </ReactMarkdown>
      </ArticleViewerBody>
    </Card>
  );
}
