import ArticleViewer from "@/stories/Article/Viewer";
import Comment from "@/stories/Comment/Comment";
import Layout from "@/stories/Layout";
import Content from "@/stories/Layout/Content/Content";
import Sider from "@/stories/Layout/Sider/Sider";
import { Affix } from "antd";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import { createContext, useContext } from "react";
import styled from "styled-components";
import { ArticleContext } from "./ArticleContext";
import HomeNav from "@/stories/Nav/HomeNav";
import UserWidget from "@/stories/Sidebar/UserWidget";

type Data = {
  id: string;
};

const ArticleAction = dynamic(
  () => import("@/stories/Article/Action/ArticleAction"),
  { ssr: false }
);

const ArticleToc = dynamic(() => import("@/stories/Article/Toc/ArticleToc"), {
  ssr: false,
});

const ArticleActionWrapper = styled.div`
  @media screen and (min-width: 1279px) {
    display: none;
  }
`;

const ArticleTocWrapper = styled.div``;

export const getServerSideProps: GetServerSideProps<{
  article: Data | null;
}> = async (context: GetServerSidePropsContext) => {
  const id = context.params?.id;
  if (id === undefined) {
    return {
      props: {
        article: null,
      },
    };
  }

  const res = await fetch(`http://localhost:9396/article/${id}`);
  const articleData: Data = await res.json();

  return {
    props: {
      article: articleData,
    },
  };
};

export default function Id({ article }: any) {
  return (
    <ArticleContext.Provider value={article.data}>
      <Layout>
        <Sider
          style={{
            marginRight: "var(--wick-large-margin)",
          }}
        >
          <UserWidget></UserWidget>
          <ArticleTocWrapper
            style={{
              margin: "var(--wick-large-margin) 0 0",
            }}
          >
            <Affix offsetTop={24}>
              <ArticleToc source=".markdown-body"></ArticleToc>
            </Affix>
          </ArticleTocWrapper>
        </Sider>
        <Content>
          <ArticleViewer
            style={{
              marginBottom: "24px",
            }}
            config={article.data}
          />
          <Comment></Comment>
        </Content>
        <ArticleActionWrapper
          style={{
            marginLeft: "var(--wick-medium-margin)",
          }}
        >
          <Affix offsetTop={24}>
            <ArticleAction></ArticleAction>
          </Affix>
        </ArticleActionWrapper>
      </Layout>
    </ArticleContext.Provider>
  );
}
