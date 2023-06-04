import { Card } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

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

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  & > a {
    display: inline-block;
    width: 100%;
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
    padding: 0px 0 4px 16px;
    & a {
      width: 100%;
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
  ${(props) => {
    // console.log(props.href, 222, props.targetHref, 123);
    return props.href === props.targetHref
      ? `
        color:#3eaf7c;
    `
      : "";
  }};
`;

type CatalogItem = {
  level: number;
  href: string;
  text: string;
  children?: CatalogItem[];
};

interface ArticleTocProps {
  source: string;
}
export default function ArticleToc({ source }: ArticleTocProps) {
  const viewerRef = document.querySelector(source);
  const [level, setLevel] = useState<CatalogItem[]>([]);
  const [activeCatalog, setActiveCatalog] = useState("");
  const [parentCatalog, setParentCatalog] = useState("");
  // 生成目录数据结构
  useEffect(() => {
    const tempLevel: CatalogItem[] = [];
    const headingsList = viewerRef?.querySelectorAll("h1,h2,h3,h4,h5,h6");
    if (headingsList === undefined) {
      return;
    }
    const headings: undefined | HTMLHeadingElement[] = [].slice.call(
      headingsList
    );

    let lastItemParent: CatalogItem; // 最后一项的根元素
    let lastItem: CatalogItem; // 最后一项

    if (Array.isArray(headings)) {
      headings.reduce<CatalogItem[]>((acc, elem, index) => {
        const level = Number(elem.tagName[1]);
        const item: CatalogItem = {
          level: level,
          href: `heading${index}-${encodeURI(elem.innerText)}`,
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

        elem.setAttribute("id", `heading${index}-${encodeURI(elem.innerText)}`);
        return acc;
      }, tempLevel);
    }
    setLevel(tempLevel);
  }, [viewerRef]);

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
      // console.log(closestLi.querySelector("a")!.hash);
      setParentCatalog(closestLi.querySelector("a")!.hash);
    }
  }, []);

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

  return level.length !== 0 ? (
    <Card>
      <ArticleCatalogWrapper>{renderItems(level)}</ArticleCatalogWrapper>
    </Card>
  ) : null;
}
