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
import Response from "@/interfaces/Response";
import IReturnComments from "@/interfaces/DTO/IReturnComments";
import IArticle from "@/interfaces/DTO/Article/IArticle";
import {
  ChangeEvent,
  FocusEventHandler,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  VoteCategoryType,
  VoteCommentOrReplyType,
} from "@/interfaces/DTO/IVoteCommentOrReply";
import { VoteArticleType } from "@/interfaces/DTO/IVoteArticle";
import {
  EmojiArrayType,
  EmojiType,
} from "@/stories/Common/EmojiSelector/EmojiSelector";
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
import { articleVote, getArticleDetail } from "@/api/article.api";
import IReturnArticleDetail from "@/interfaces/DTO/Article/IArticleDetail";
import { getEmoji } from "@/api/emoji.api";
import { whoAmI } from "@/api/user.api";
import IUser from "@/interfaces/DTO/IUser";

const { Sider, Content } = Layout;

type Data = {
  id: string;
  data: IArticle;
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

const LayoutWrapper = styled.div`
  margin: var(--wick-large-margin) 0 var(--wick-large-margin);
  position: relative;
  padding-right: 56px;

  @media screen and (max-width: 960px) {
    padding-right: 0;
  }

  & .ant-layout-sider {
    @media screen and (max-width: 960px) {
      display: none;
    }
  }
`;

const ArticleActionWrapper = styled.div`
  margin: 0 0 0 var(--wick-medium-margin);
  display: none;
  position: absolute;
  top: 0;
  width: 48px;
  right: 0px;

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

const UserContext = createContext<{
  userData: {
    id: string;
    github_home: string;
    name: string;
  };
} | null>(null);

export default function Id({ article }: ArticleIdProps) {
  const [comment, setComment] = useState<IReturnComments>();
  const [user, setUser] = useState<IUser>();
  const [emoji, setEmoji] = useState<EmojiArrayType>();
  const [articleDetail, setArticleDetail] = useState<IReturnArticleDetail>();

  useEffect(() => {
    const handleGetComments = async () => {
      const result: AxiosResponse<Response<IReturnComments>> =
        await getComments(article.id);
      setComment(result.data.data);
    };
    handleGetComments();
    const handleGetArticleDetail = async () => {
      const result = await getArticleDetail(article.id);
      setArticleDetail(result.data.data);
    };
    handleGetArticleDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleGetEmoji = async () => {
      const response = await getEmoji();
      const data = response.data;
      setEmoji(data.data);
    };
    handleGetEmoji();
  }, []);

  useEffect(() => {
    const handleWhoAmI = async () => {
      const response = await whoAmI();
      const data = response.data;
      setUser(data.data);
      console.log(data);
    };
    handleWhoAmI();
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
  const handleArticleVoteUp = useCallback(async () => {
    try {
      const response = await articleVote(article.id, VoteArticleType.UP);
      if (response !== undefined) {
        const data = response.data;
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
  const handleArticleVoteDown = useCallback(async () => {
    try {
      const response = await articleVote(article.id, VoteArticleType.DOWN);
      if (response !== undefined) {
        const data = response.data;
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
    try {
      const response = await publishComment(content, article.id);
      if (response !== undefined) {
        const data = response.data;
        if (response.status === 201) {
          if (data.data !== undefined) {
            data.data.user = user!;
            setComment(
              produce((draft) => {
                draft?.data.unshift(data.data!);
              })
            );
            if (data.success == true) {
              notification.success({
                message: data.message,
                placement: "top",
              });
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
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
  const handleLogin = () => {
    const childWindow = window.open(
      `${window.location.origin}/oauth/?platform=github`,
      "_blank",
      "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=800, height=600"
    );

    // 授权页面关闭后后刷新父窗口
    const timerId = window.setInterval(function () {
      console.log("关闭", childWindow?.closed);
      if (!(childWindow && !childWindow.closed)) {
        window.clearInterval(timerId);
        setTimeout(function () {
          window.location.reload();
        }, 100);
      }
    }, 300);
  };

  return (
    <>
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
                marginBottom: "var(--wick-large-margin)",
              }}
              article={article}
            />
            <Comment
              onLogin={handleLogin}
              emojiList={emoji}
              onPublish={handlePublishComment}
              onReply={handleReplyComment}
              onGetMoreComments={handleGetMoreComments}
              onGetMoreReplies={handleGetMoreReplies}
              commentData={comment}
              onVoteUp={handleCommentOrReplyVoteUp}
              onVoteDown={handleCommentOrReplyVoteDown}
            ></Comment>
          </Content>
        </Layout>
        <ArticleActionWrapper>
          <Affix offsetTop={24}>
            <ArticleAction
              voteInfo={articleDetail?.user_interact}
              onVoteUp={handleArticleVoteUp}
              onVoteDown={handleArticleVoteDown}
              voteCount={article.voteUpCount - article.voteDownCount}
            ></ArticleAction>
          </Affix>
        </ArticleActionWrapper>
      </LayoutWrapper>
    </>
  );
}
