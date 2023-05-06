import { Card, Tag } from "antd";
import styled from "styled-components";

interface ArticleItemProps {
  article: {
    id: string;
    title: string;
    description: null;
    tags: { id: string; name: string; color: string | null }[];
    updatedAt: string;
  };
}

const ArticleItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 6px;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
`;
const ArticleItemTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const ArticleItemBaseInfo = styled.div`
  display: flex;
  gap: 8px;
`;

const ArticleItemUsername = styled.span`
  font-weight: bold;
  height: 100%;
  display: inline-block;
`;
const ArticleItemTime = styled.span``;
const ArticleItemTags = styled.div``;

const ArticleItemBody = styled.div`
  user-select: none;
  padding: 10px 0 0;
`;
const ArticleItemContent = styled.div`
  color: #737373;
  word-break: break-all;
`;

export default function ArticleItem({ article }: ArticleItemProps) {
  return (
    <>
      <Card hoverable>
        <ArticleItemHeader>
          <ArticleItemBaseInfo>
            <ArticleItemUsername>OnlyWick</ArticleItemUsername>
            <ArticleItemTime>{article.updatedAt}</ArticleItemTime>
          </ArticleItemBaseInfo>
          <ArticleItemTags>
            {article.tags &&
              article.tags.map((tag) => {
                return (
                  <Tag key={tag.id} color={tag.color ? tag.color : "cyan"}>
                    {tag.name}
                  </Tag>
                );
              })}
          </ArticleItemTags>
        </ArticleItemHeader>
        <ArticleItemBody>
          <ArticleItemTitle>{article.title}</ArticleItemTitle>
          <ArticleItemContent>{article.description}</ArticleItemContent>
        </ArticleItemBody>
      </Card>
    </>
  );
}
