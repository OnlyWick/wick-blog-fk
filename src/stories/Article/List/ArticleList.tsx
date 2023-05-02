import { ReactNode } from "react";
import ArticleItem from "./Item/ArticleItem";
import { Card } from "antd";
import styled from "styled-components";

interface ArticleListProps {
  children: ReactNode[];
}

const ArticleListWrapper = styled.ul``;

const ArticleListItem = styled.li`
  margin-bottom: 12px;
  cursor: pointer;
`;

export default function ArticleList({ children }: ArticleListProps) {
  return (
    <ArticleListWrapper>
      {children.map((child, index) => {
        return <ArticleListItem key={index}>{child}</ArticleListItem>;
      })}
    </ArticleListWrapper>
  );
}
