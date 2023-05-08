import { Card, Divider, Tag } from "antd";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { Viewer } from "@bytemd/react";
import styled from "styled-components";
import "bytemd/dist/index.min.css";
import "juejin-markdown-themes/dist/vuepress.min.css";
import highlight from "@bytemd/plugin-highlight";
import highlightSSR from "@bytemd/plugin-highlight-ssr";
import "highlight.js/styles/vs2015.css";

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

const ArticleCatalogWrapper = styled.ul``;

interface ArticleCatalogItemProps {
  isActive?: boolean;
}

const ArticleCatalogItem = styled.li<ArticleCatalogItemProps>`
  padding: 4px 0;

  & ul li {
    padding: 8px 24px;
  }

  & a {
    color: ${(props) => (props.isActive ? "red" : "#3eaf7c")};
    /* color: #3eaf7c; */
    text-decoration: none;
  }
`;
const ArticleCatalogItemLink = styled.a.attrs((props) => ({
  href: props.href,
}))`
  color: red !important;
`;

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

type CatalogItem = Array<{
  level: number;
  href: string;
  text: string;
  children?: CatalogItem;
}>;

export default function ArticleViewer({ config, style }: ArticleViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [level, setLevel] = useState<CatalogItem>([]);
  const [activeCatalog, setActiveCatalog] = useState(false);

  useEffect(() => {
    const tempLevel: CatalogItem = [];
    const headings: undefined | HTMLHeadingElement[] = [].slice.call(
      viewerRef.current?.querySelectorAll("h1,h2,h3,h4,h5,h6")
    );

    let lastItem: any;

    if (headings !== undefined && headings.length != 0) {
      headings.reduce<CatalogItem>((acc, elem, index) => {
        const level = Number(elem.tagName[1]);
        const item = {
          level: level,
          href: `${encodeURI(elem.innerText)}`,
          text: elem.innerText,
        };

        if (!lastItem || level === 1) {
          tempLevel.push(item);
          lastItem = item;
        } else {
          if (!lastItem.children) {
            lastItem.children = [];
          }
          lastItem.children.push(item);
        }

        lastItem = item;
        elem.setAttribute("id", `${encodeURI(elem.innerText)}`);
        return acc;
      }, tempLevel);
    }
    setLevel(tempLevel);
    console.log(tempLevel);
  }, []);

  useEffect(() => {
    window.addEventListener("hashchange", (e) => {});
  }, []);

  // TODO: 当进入页面时, 激活对应目录样式
  // TODO: 目录组件独立
  const renderItems = (items: CatalogItem) => {
    return items.map((item) => (
      <ArticleCatalogItem isActive={false} key={item.href}>
        <ArticleCatalogItemLink href={`#${item.href}`}>
          {item.text}
        </ArticleCatalogItemLink>
        {item.children && <ul>{renderItems(item.children)}</ul>}
      </ArticleCatalogItem>
    ));
  };

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
        <ArticleViewerBody ref={viewerRef}>
          <Viewer plugins={plugins} value={config.content}></Viewer>
        </ArticleViewerBody>
      </Card>
      <Card>
        <ul>{renderItems(level)}</ul>
      </Card>
    </ArticleViewerWrapper>
  );
}
