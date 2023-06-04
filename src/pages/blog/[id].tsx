import ArticleViewer from "@/stories/Article/Viewer";
import Layout from "@/stories/Layout";
import Content from "@/stories/Layout/Content/Content";
import Sider from "@/stories/Layout/Sider/Sider";
import { Affix } from "antd";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import styled from "styled-components";
import ArticleContext, { IArticleContext } from "../../Context/ArticleContext";
import UserWidget from "@/stories/Sidebar/UserWidget";
import useSWR, { mutate, useSWRConfig } from "swr";
import ArticleType from "@/interfaces/IArticleType";
import IComments from "@/interfaces/IComments";
import ISubReply from "@/interfaces/ISubReply";
import IReplies from "@/interfaces/IReplies";
import { produce } from "immer";

type Data = {
  id: string;
  data: ArticleType;
};

const ArticleAction = dynamic(
  () => import("@/stories/Article/Action/ArticleAction"),
  { ssr: false }
);

const Comment = dynamic(() => import("@/stories/Comment/Comment"), {
  ssr: false,
});

const ArticleToc = dynamic(() => import("@/stories/Article/Toc/ArticleToc"), {
  ssr: false,
});

const ArticleActionWrapper = styled.div`
  display: none;

  @media screen and (min-width: 960px) {
    display: block;
  }
`;

const ArticleTocWrapper = styled.div``;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
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
      article: articleData.data,
    },
  };
};

interface ArticleIdProps {
  article: ArticleType;
}

const fetcher = (url: any) => fetch(url).then((r) => r.json());

export default function Id({ article }: ArticleIdProps) {
  const url = `http://192.168.31.86:9396/comment/list?article_id=${article.id}`;
  const { data: commentData } = useSWR<IComments[]>(url, fetcher);

  const updateCommentData = (root_reply_id: string, data: IReplies) => {
    const newCommentData =
      commentData &&
      produce(commentData, (draft) => {
        draft.map((comment) => {
          return comment.replies.map((reply) => {
            if (root_reply_id === reply.id) {
              reply.sub_reply = data.sub_reply;
              // reply.sub_reply.push(...data.sub_reply);
            }
          });
        });
      });
    console.log(newCommentData, "updated");
    return newCommentData;
    // return newCommentData; // 返回更新后的commentData
  };

  const handleGetMoreSubReply = async (root_reply_id: string) => {
    const data = await fetch(
      `http://192.168.31.86:9396/comment/getMoreSubReply?reply_id=${root_reply_id}`
    );
    const result = await data.json();
    mutate(url, updateCommentData(root_reply_id, result), false);
  };

  const context: IArticleContext = {
    articleData: article,
    getMoreSubReply: handleGetMoreSubReply,
  };

  return (
    <ArticleContext.Provider value={context}>
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
            article={article}
          />
          <Comment commentData={commentData}></Comment>
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
