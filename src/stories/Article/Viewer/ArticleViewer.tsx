import { Card, Divider, Tag } from "antd";
import { CSSProperties } from "react";
import { Viewer } from "@bytemd/react";
import styled from "styled-components";
import "bytemd/dist/index.min.css";
import highlight from "@bytemd/plugin-highlight";
import highlightSSR from "@bytemd/plugin-highlight-ssr";
import "highlight.js/styles/vs2015.css";
import "juejin-markdown-themes/dist/vuepress.min.css";

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
interface ArticleViewerProps {
  config: {
    title?: string;
    tags?: { id: string; name: string; color: string | null }[];
    keywords?: string[];
    readCount?: number;
    updatedAt?: string;
    content: string;
  };
  style?: CSSProperties;
}

const plugins = [highlight(), highlightSSR()];

export default function ArticleViewer({ config, style }: ArticleViewerProps) {
  return (
    <ArticleViewerWrapper style={style}>
      <Card>
        <ArticleViewerHeader>
          <ArticleViewerTitle>{config.title}</ArticleViewerTitle>
          <ArticleViewerBaseInfo>
            <span>{config.updatedAt}</span>
            <Divider type="vertical"></Divider>
            <span>{config.readCount}</span>
            <Divider type="vertical"></Divider>
            {config.tags &&
              config.tags.map((tag) => {
                return (
                  <Tag key={tag.id} color={tag.color ? tag.color : "orange"}>
                    {tag.name}
                  </Tag>
                );
              })}
          </ArticleViewerBaseInfo>
        </ArticleViewerHeader>
        <ArticleViewerBody>
          <Viewer plugins={plugins} value={config.content}></Viewer>
        </ArticleViewerBody>
      </Card>
    </ArticleViewerWrapper>
  );
}
