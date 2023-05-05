import { Card, Tag } from "antd";
import styled from "styled-components";

interface ArticleItemProps {}

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

const ArticleItemBody = styled.a`
  user-select: none;
  padding: 10px 0 0;
`;
const ArticleItemContent = styled.div`
  color: #737373;
  word-break: break-all;
`;

export default function ArticleItem(config: ArticleItemProps) {
  return (
    <>
      <Card hoverable>
        <ArticleItemHeader>
          <ArticleItemBaseInfo>
            <ArticleItemUsername>OnlyWick</ArticleItemUsername>
            <ArticleItemTime>2023年4月21日19:54</ArticleItemTime>
          </ArticleItemBaseInfo>
          <ArticleItemTags>
            <Tag color="cyan">前端</Tag>
            <Tag color="cyan">后端</Tag>
            <Tag color="cyan">React</Tag>
            <Tag color="cyan">Vue</Tag>
          </ArticleItemTags>
        </ArticleItemHeader>
        <ArticleItemBody href="/blog/123">
          <ArticleItemTitle>正确摸鱼</ArticleItemTitle>
          <ArticleItemContent>
            当进行网络请求和 API
            调用时，你是否知道本次请求的参数类型以及返回的响应数据类型？知道了请求的数据类型与响应的数据类型，会为得到的
            json 数据定义 type/interface，使其有更好的类型提示？还是会在 any
            类型下获取属性，但由于没有类型提示，导致写错个单词，最终提示 Cannot
            read properties of undefined (reading )？ 作者：愧怍
            链接：https://juejin.cn/post/7208019379829112893 来源：稀土掘金
            著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
          </ArticleItemContent>
        </ArticleItemBody>
      </Card>
    </>
  );
}
