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
  @media screen and (max-width: 1337px) {
    display: none;
  }
`;

const ArticleTocWrapper = styled.div`
  @media screen and (max-width: 1600px) {
    display: none;
  }
`;

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
      <Layout style={{ marginTop: "24px", width: "100%" }}>
        <Sider width="auto">
          <ArticleActionWrapper style={{ marginRight: "24px" }}>
            <Affix offsetTop={24}>
              <ArticleAction></ArticleAction>
            </Affix>
          </ArticleActionWrapper>
        </Sider>
        <Content
          style={{
            overflow: "auto",
          }}
        >
          <ArticleViewer
            style={{
              marginBottom: "24px",
            }}
            config={article.data}
          />
          <Comment></Comment>
        </Content>

        <ArticleTocWrapper>
          <Sider width="15rem" style={{ marginLeft: "24px" }}>
            <Affix offsetTop={24}>
              <ArticleToc source=".markdown-body"></ArticleToc>
            </Affix>
          </Sider>
        </ArticleTocWrapper>
      </Layout>
    </ArticleContext.Provider>
  );
}
