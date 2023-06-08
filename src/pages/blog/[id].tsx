import ArticleViewer from "@/stories/Article/Viewer";
// import Layout from "@/stories/Layout";
// import Content from "@/stories/Layout/Content/Content";
// import Sider from "@/stories/Layout/Sider/Sider";
import { Affix, Layout, notification } from "antd";
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
import IArticle from "@/interfaces/DTO/IArticle";
import IReplies from "@/interfaces/DTO/IReplies";
import { useCallback, useEffect } from "react";
import {
  VoteCategoryType,
  VoteCommentOrReplyType,
} from "@/interfaces/DTO/IVoteCommentOrReply";
import { VoteArticleType } from "@/interfaces/DTO/IVoteArticle";

const { Sider, Content } = Layout;

type Data = {
  id: string;
  data: IArticle;
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
  margin: 0 0 0 var(--wick-medium-margin);
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
  article: IArticle;
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
              // TODO: push
              reply.sub_reply = data.sub_reply;
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
  const handleCommentOrReplyVoteUp = useCallback(
    async (voteId: string, voteCategory: VoteCategoryType) => {
      try {
        const response = await fetch(`http://localhost:9396/comment/vote`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vote_id: voteId,
            category: voteCategory,
            vote_type: VoteCommentOrReplyType.UP,
          }),
          credentials: "include",
        });
        if (response.status == 401) {
          notification.warning({
            message: "您没登录呢",
            placement: "top",
          });
        } else {
          const data = await response.json();
          const message = data.message;
          if (data.success) {
            notification.success({
              message,
              placement: "top",
            });
          } else {
            notification.warning({
              message,
              placement: "top",
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const handleCommentOrReplyVoteDown = useCallback(
    async (voteId: string, voteCategory: VoteCategoryType) => {
      try {
        const response = await fetch(`http://localhost:9396/comment/vote`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vote_id: voteId,
            category: voteCategory,
            vote_type: VoteCommentOrReplyType.DOWN,
          }),
          credentials: "include",
        });
        if (response.status == 401) {
          notification.warning({
            message: "您没登录呢",
            placement: "top",
          });
        } else {
          const data = await response.json();
          const message = data.message;
          if (data.success) {
            notification.success({
              message,
              placement: "top",
            });
          } else {
            notification.warning({
              message,
              placement: "top",
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const handleArticleVoteUp = useCallback(
    async (voteId: string) => {
      try {
        console.log(voteId);
        const response = await fetch(`http://localhost:9396/article/vote`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vote_id: article.id,
            vote_type: VoteArticleType.UP,
          }),
          credentials: "include",
        });
        if (response.status == 401) {
          notification.warning({
            message: "您没登录呢",
            placement: "top",
          });
        } else {
          const data = await response.json();
          const message = data.message;
          if (data.success) {
            notification.success({
              message,
              placement: "top",
            });
          } else {
            notification.warning({
              message,
              placement: "top",
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    [article]
  );

  const handleArticleVoteDown = useCallback(
    async (voteId: string) => {
      try {
        const response = await fetch(`http://localhost:9396/article/vote`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vote_id: article.id,
            vote_type: VoteArticleType.DOWN,
          }),
          credentials: "include",
        });
        if (response.status == 401) {
          notification.warning({
            message: "您没登录呢",
            placement: "top",
          });
        } else {
          const data = await response.json();
          const message = data.message;
          if (data.success) {
            notification.success({
              message,
              placement: "top",
            });
          } else {
            notification.warning({
              message,
              placement: "top",
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    [article]
  );

  // TODO: 不应该使用 context
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
            <Comment
              commentData={commentData?.data}
              onVoteUp={handleCommentOrReplyVoteUp}
              onVoteDown={handleCommentOrReplyVoteDown}
            ></Comment>
          </Content>
          <ArticleActionWrapper>
            <Affix offsetTop={24}>
              <ArticleAction
                onVoteUp={handleArticleVoteUp}
                onVoteDown={handleArticleVoteDown}
                voteCount={article.voteUpCount - article.voteDownCount}
              ></ArticleAction>
            </Affix>
          </ArticleActionWrapper>
        </Layout>
      </LayoutWrapper>
    </ArticleContext.Provider>
  );
}
