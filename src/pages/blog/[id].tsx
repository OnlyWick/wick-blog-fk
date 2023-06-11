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
// import ArticleAction from "@/stories/Article/Action/ArticleAction";
import Response from "@/interfaces/Response";
import IReturnComments from "@/interfaces/DTO/IReturnComments";
import IArticle from "@/interfaces/DTO/IArticle";
import {
  ChangeEvent,
  FocusEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  VoteCategoryType,
  VoteCommentOrReplyType,
} from "@/interfaces/DTO/IVoteCommentOrReply";
import { VoteArticleType } from "@/interfaces/DTO/IVoteArticle";
import { EmojiArrayType } from "@/stories/Common/EmojiSelector/EmojiSelector";
import ArticleAction from "@/stories/Article/Action/ArticleAction";
import {
  replyComment,
  publishComment,
  voteCommentOrReply,
  getMoreComments,
  getMoreReplies,
  getComments,
} from "@/api/comment.api";
import { ICreateReply } from "@/interfaces/DTO/Comment/ICreateReply";
import IReplies from "@/interfaces/DTO/Comment/IReplies";
import axios, { AxiosResponse } from "axios";
import IComments from "@/interfaces/DTO/Comment/IComments";
import { cp } from "fs";

const { Sider, Content } = Layout;

type Data = {
  id: string;
  data: IArticle;
};

// TODO: 不需要 SSR
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
  const [comment, setComment] = useState<IReturnComments>();

  useEffect(() => {
    const handleGetComments = async () => {
      const result: AxiosResponse<Response<IReturnComments>> =
        await getComments(article.id);
      setComment(result.data.data);
    };
    handleGetComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetMoreComments = async (page: string) => {
    const comments = await getMoreComments(article.id, page);

    setComment(
      produce((draft) => {
        draft?.data.push(...comments.data!);
      })
    );
  };
  const handleGetMoreReplies = async (commentId: string, page: string) => {
    const result = await getMoreReplies(commentId, page);
    setComment(
      produce((draft) => {
        const targetComment = draft?.data.find(
          (comment) => comment.id === commentId
        );
        targetComment?.replies.push(...result.data!);
      })
    );
  };
  const handleCommentOrReplyVoteUp = async (
    voteId: string,
    voteCategory: VoteCategoryType
  ) => {
    const response = await voteCommentOrReply(
      voteId,
      voteCategory,
      VoteCommentOrReplyType.UP
    );
    const data = response.data;
    if (response.status === 201) {
      if (data.success === true) {
        notification.success({
          message: data.message,
          placement: "top",
        });
      } else {
        notification.warning({
          message: data.message,
          placement: "top",
        });
      }
    }
  };
  const handleCommentOrReplyVoteDown = async (
    voteId: string,
    voteCategory: VoteCategoryType
  ) => {
    const response = await voteCommentOrReply(
      voteId,
      voteCategory,
      VoteCommentOrReplyType.DOWN
    );
    const data = response.data;
    if (response.status === 201) {
      if (data.success === true) {
        notification.success({
          message: data.message,
          placement: "top",
        });
      } else {
        notification.warning({
          message: data.message,
          placement: "top",
        });
      }
    }
  };
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
  const handleArticleVoteDown = useCallback(async () => {
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
  }, [article]);

  const handlePublishComment = async (content: string) => {
    const response = await publishComment(content, article.id);
    const data = response.data;
    if (data.success == true) {
      notification.success({
        message: data.message,
        placement: "top",
      });
    }
  };
  const handleReplyComment = async (
    payload: Omit<ICreateReply, "article_id">
  ) => {
    const response = await replyComment({
      ...payload,
      article_id: article.id,
    });
    const data = response.data;
    if (data.success == true) {
      notification.success({
        message: data.message,
        placement: "top",
      });
      return true;
    }
    return false;
  };
  const { data: emojiList } = useSWR<Response<EmojiArrayType>>(
    `http://localhost:9396/emoji`,
    fetcher
  );

  return (
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
            emojiList={emojiList?.data}
            onPublish={handlePublishComment}
            onReply={handleReplyComment}
            onGetMoreComments={handleGetMoreComments}
            onGetMoreReplies={handleGetMoreReplies}
            commentData={comment}
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
  );
}
