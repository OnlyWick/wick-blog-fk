import { Card, Divider, Tag } from "antd";
import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
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

const ArticleCatalogWrapper = styled.ul`
  padding-left: 4px;

  & > li {
    font-weight: bold;
  }
`;

interface ArticleCatalogItemProps {
  originHref: string;
  targetHref: string;
  parentHref: string;
  isH1: string;
}

const ArticleCatalogItem = styled.li<ArticleCatalogItemProps>`
  font-size: 16px;
  /* border-left: 4px solid red; */
  // TODO: 点击子元素, h1 要变色
  & > a {
    border-left: 4px solid transparent;
    ${(props) =>
      props.originHref === props.targetHref ||
      props.parentHref === props.originHref
        ? `
      border-left: 4px solid #3eaf7c;
      color: #3eaf7c;
    `
        : ""};
    padding: 2px 2px 2px 14px;
  }

  & ul > li {
    font-weight: normal;
    border: none;
    padding: 0px 0 4px 16px;
    & a {
      border: none;
    }
  }
`;

interface ArticleCatalogItemLinkProps {
  href: string;
  targetHref: string;
}
const ArticleCatalogItemLink = styled.a<ArticleCatalogItemLinkProps>`
  color: #2c3e50;
  ${(props) =>
    props.href === props.targetHref
      ? `
        color:#3eaf7c;
    `
      : ""};
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

type CatalogItem = {
  level: number;
  href: string;
  text: string;
  children?: CatalogItem[];
};

export default function ArticleViewer({ config, style }: ArticleViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [level, setLevel] = useState<CatalogItem[]>([]);
  const [activeCatalog, setActiveCatalog] = useState("");
  const [parentCatalog, setParentCatalog] = useState("");

  // 生成目录数据结构
  useEffect(() => {
    const tempLevel: CatalogItem[] = [];
    const headings: undefined | HTMLHeadingElement[] = [].slice.call(
      viewerRef.current?.querySelectorAll("h1,h2,h3,h4,h5,h6")
    );

    let lastItemParent: CatalogItem; // 最后一项
    let lastItem: CatalogItem; // 最后一项

    if (headings !== undefined && headings.length != 0) {
      headings.reduce<CatalogItem[]>((acc, elem, index) => {
        const level = Number(elem.tagName[1]);
        const item: CatalogItem = {
          level: level,
          href: `${encodeURI(elem.innerText)}`,
          text: elem.innerText,
        };

        const isH1OrNonExistLastItem = !lastItem || level === 1;

        if (isH1OrNonExistLastItem) {
          tempLevel.push(item);
          lastItem = item;
          lastItemParent = item;
        } else {
          if (item.level > lastItem.level) {
            // 当前 level 大于之前的 level, 说明是子元素
            if (lastItem.children === undefined) {
              lastItem.children = [];
            }
            lastItem.children.push(item);
            lastItemParent = lastItem;
          } else {
            if (lastItemParent.children === undefined) {
              lastItemParent.children = [];
            }
            lastItemParent.children.push(item);
          }
        }
        lastItem = item;

        elem.setAttribute("id", `${encodeURI(elem.innerText)}`);
        return acc;
      }, tempLevel);
    }
    setLevel(tempLevel);
  }, []);

  const handleHashChange = () => {
    setActiveCatalog(window.location.hash);
  };

  useEffect(() => {
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    setActiveCatalog(window.location.hash);
  }, []);

  const handleParentActive = useCallback((e: any) => {
    const closestLi = (e.currentTarget as HTMLElement).closest("li");
    const outermostUl = closestLi?.parentNode?.parentNode;
    if (outermostUl?.nodeName === "DIV" && closestLi !== null) {
      setParentCatalog(closestLi.querySelector("a")!.hash);
    }
  }, []);

  // TODO: 当进入页面时, 激活对应目录样式
  // TODO: 目录组件独立
  const renderItems = (items: CatalogItem[]) => {
    return items.map((item) => {
      return (
        <ArticleCatalogItem
          parentHref={`${parentCatalog}`}
          originHref={`#${item.href}`}
          isH1={`${item.level === 1}`}
          targetHref={activeCatalog}
          key={item.href}
          onClick={handleParentActive}
        >
          <ArticleCatalogItemLink
            href={`#${item.href}`}
            targetHref={activeCatalog}
          >
            {item.text}
          </ArticleCatalogItemLink>
          {item.children && (
            <ArticleCatalogWrapper>
              {renderItems(item.children)}
            </ArticleCatalogWrapper>
          )}
        </ArticleCatalogItem>
      );
    });
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
        <ArticleCatalogWrapper>{renderItems(level)}</ArticleCatalogWrapper>
      </Card>
    </ArticleViewerWrapper>
  );
}
