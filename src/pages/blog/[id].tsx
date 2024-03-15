import ArticleViewer from "@/stories/Article/Viewer";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import styled from "styled-components";
import ArticleContext, { IArticleContext } from "../../Context/ArticleContext";
import UserWidget from "@/stories/Sidebar/UserWidget";
import { Anchor, BackTop, Button, Notification } from '@douyinfe/semi-ui';

import { produce } from "immer";
import Response from "@/interfaces/Response";
import IReturnComments from "@/interfaces/DTO/IReturnComments";
import IArticle from "@/interfaces/DTO/Article/IArticle";
import {
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
import TopNav from "@/stories/Nav/TopNav/TopNav";
import ExternalLink from "@/stories/icon/externalLink";

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
  margin: 0 auto;
  position: relative;
  max-width: 65ch;
  width: 100%;

  @media screen and (max-width: 960px) {
    padding-right: 0;
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

const ArticleTocWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 50px;
  height: calc(100% - 50px);
  opacity: 0;
  transition: all cubic-bezier(0.075, 0.82, 0.165, 1) .7s;

  @media screen and (max-width: 1024px) {
    display: none;
  }

  &:hover {
  opacity: 1;
  }
`;

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

  console.log(id)
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
              Notification.open({
                content: data.message,
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
      Notification.open({
        content: data.message,
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
      <div className="mt-16 fixed left-0 top-0 z-0 h-full opacity-0 hover:opacity-100 ease-in-out transition-all duration-300">
        <ArticleToc source=".markdown-body"></ArticleToc>
      </div>
      <div className="prose m-auto">
        <h1>{article.title}</h1>
        <ArticleViewer article={article} />
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
      </div>
      <BackTop />
    </>
  );
}
