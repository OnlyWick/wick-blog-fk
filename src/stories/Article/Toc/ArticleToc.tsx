import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const TocWrapper = styled.div`

  & > ul {
    opacity: .85;
  }
`;

const ArticleCatalogWrapper = styled.ul`
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
max-width: 200px;
  font-size: .8em;
  text-overflow: ellipsis;
  overflow: hidden;

  & > a {
    text-decoration: none;
    display: inline-block;
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

  & > a:hover {
    text-decoration: underline;
  }


  & ul > li {
    font-weight: normal;
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
  const replaceSpaceToHyphen = (str: string) => str.replaceAll(' ', '-')
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
          href: `${replaceSpaceToHyphen(elem.innerText)}`,
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

        elem.dataset["id"] = `${replaceSpaceToHyphen(elem.innerText)}`;
        return acc;
      }, tempLevel);
    }
    setLevel(tempLevel);
  }, [viewerRef]);

  const handleHashChange = () => {
    const hash = decodeURI(window.location.hash);
    setActiveCatalog(hash);
  };

  useEffect(() => {
    window.addEventListener("hashchange", handleHashChange);
    const hash = decodeURI(window.location.hash);
    console.log(hash)
    handleToAnchor(hash.replace("#", ''))

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

  const handleToAnchor = (id: string) => {
    const elem = document.querySelector(`[data-id="${id}"]`) as HTMLElement;

    if (elem) {
      window.scrollTo({
        top: elem.offsetTop - 56,
        behavior: "smooth"
      })
    }
  }

  const renderItems = (items: CatalogItem[]) => {
    return items.map((item) => {
      return (
        <li className={`group text-[.8em]`}
          key={item.href}
          onClick={handleParentActive}
        >
          <a
            href={`#${item.href}`}
            onClick={() => handleToAnchor(item.href)}
            className={`${activeCatalog === item.href ? "color:#3eaf7c" : ""} ${item.href === activeCatalog ||
              parentCatalog === item.href ? "text-green-200" : ""} pr-1 py-1 pl-4 inline-block hover:underline`}
          >
            {item.text}
          </a>
          {item.children && (
            <ul className="pl-4">
              {renderItems(item.children)}
            </ul>
          )}
        </li>
      );
    });
  };

  return level.length !== 0 ? (
    <aside className="h-full w-48">
      <ul className="pl-4">{renderItems(level)}</ul>
    </aside>
  ) : null;
}
