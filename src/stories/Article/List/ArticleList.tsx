import { ReactNode } from "react";
import ArticleItem from "./Item/ArticleItem";
import styled from "styled-components";
import Link from "next/link";

interface ArticleListProps {
  articles: {
    id: string;
    title: string;
    description: null;
    tags: { id: string; name: string; color: string | null }[];
    updatedAt: string;
  }[];
}

const ArticleListWrapper = styled.ul`
  width: 100%;
`;

const ArticleListItem = styled.li`
  margin-bottom: 12px;
  cursor: pointer;
`;

export default function ArticleList({ articles }: ArticleListProps) {
  return (
    <ArticleListWrapper>
      {articles &&
        articles.map((article: any) => {
          return (
            <ArticleListItem key={article.id}>
              <Link
                style={{ textDecoration: "none" }}
                href={`/blog/${article.id}`}
              >
                <ArticleItem article={article}></ArticleItem>
              </Link>
            </ArticleListItem>
          );
        })}
    </ArticleListWrapper>
  );
}
