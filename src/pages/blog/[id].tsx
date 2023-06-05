import ArticleViewer from "@/stories/Article/Viewer";
// import Layout from "@/stories/Layout";
// import Content from "@/stories/Layout/Content/Content";
// import Sider from "@/stories/Layout/Sider/Sider";
import { Affix, Layout } from "antd";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import styled from "styled-components";
import ArticleContext, { IArticleContext } from "../../Context/ArticleContext";
import UserWidget from "@/stories/Sidebar/UserWidget";
import useSWR, { mutate, useSWRConfig } from "swr";

import { produce } from "immer";
import ArticleAction from "@/stories/Article/Action/ArticleAction";
import Response from "@/interfaces/Response";
import IReturnComments from "@/interfaces/DTO/IReturnComments";
import IArticleType from "@/interfaces/DTO/IArticleType";
import IReplies from "@/interfaces/DTO/IReplies";

const { Sider, Content } = Layout;

type Data = {
  id: string;
  data: IArticleType;
};

// const ArticleAction = dynamic(
//   () => import("@/stories/Article/Action/ArticleAction"),
//   { ssr: false }
// );

const Comment = dynamic(() => import("@/stories/Comment/Comment"), {
  ssr: false,
});

const ArticleToc = dynamic(() => import("@/stories/Article/Toc/ArticleToc"), {
  ssr: false,
});

const LayoutWrapper = styled.div`
  & .ant-layout-sider {
    @media screen and (max-width: 960px) {
      display: none;
    }
  }
`;

const ArticleActionWrapper = styled.div`
  margin: 0 var(--wick-medium-margin);
  display: none;

  @media screen and (min-width: 960px) {
    display: flex;
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
  article: IArticleType;
}

const fetcher = (url: any) => fetch(url).then((r) => r.json());

export default function Id({ article }: ArticleIdProps) {
  const url = `http://192.168.31.86:9396/comment/list?article_id=${article.id}`;
  const { data: commentData } = useSWR<Response<IReturnComments>>(url, fetcher);
  console.log(commentData?.data?.data, "FKWICK");

  const updateCommentData = (
    root_reply_id: string,
    data: IReplies
  ): Response<IReturnComments> => {
    const newCommentData =
      commentData &&
      commentData.data &&
      commentData.data.data &&
      produce(commentData.data.data, (draft) => {
        draft.map((comment) => {
          return comment.replies.map((reply) => {
            if (root_reply_id === reply.id) {
              // console.log(reply.sub_reply, data.sub_reply, "JOHN");
              reply.sub_reply = data.sub_reply;
              // reply.sub_reply.push(...data.sub_reply);
            }
          });
        });
      });
    console.log(newCommentData, "updated");
    return {
      message: commentData!.message,
      success: commentData!.success,
      data: {
        data: newCommentData!,
        count: commentData!.data!.count,
      },
    };
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
      <LayoutWrapper>
        <Layout
          hasSider
          style={{
            background: "transparent",
          }}
        >
          <Sider
            width={378}
            style={{
              marginRight: "var(--wick-large-margin)",
              background: "transparent",
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
            <Comment commentData={commentData?.data}></Comment>
          </Content>
          <ArticleActionWrapper>
            <Affix offsetTop={24}>
              <ArticleAction
                voteCount={article.voteUpCount - article.voteDownCount}
              ></ArticleAction>
            </Affix>
          </ArticleActionWrapper>
        </Layout>
      </LayoutWrapper>
    </ArticleContext.Provider>
  );
}
