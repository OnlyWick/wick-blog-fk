import ArticleContext from "@/Context/ArticleContext";

import { VoteCategoryType } from "@/interfaces/DTO/IVoteCommentOrReply";
import { ArrowUpIcon, CommentIcon } from "@/stories/Common/icon";
import ArrowDownIcon from "@/stories/Common/icon/ArrowDownIcon";
import MarkdownPreview from "@/stories/MarkdownPreview/MarkdownPreview";
// import MarkdownPreview from "@/stories/MarkdownPreview/MarkdownPreview";
import { Avatar, Button, Typography, Card } from "@douyinfe/semi-ui";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { CommentContext } from "../CommentContext";
import { CommentTextarea } from "../Textarea/CommentTextarea";
import { ICreateReply } from "@/interfaces/DTO/Comment/ICreateReply";
import { ReplyTypeEnum } from "@/interfaces/DTO/IReplyType";
import IComments from "@/interfaces/DTO/Comment/IComments";
import IReplies from "@/interfaces/DTO/Comment/IReplies";
import IUserInteract from "@/interfaces/DTO/IUserInteract";
const { Paragraph } = Typography;

const CommentItemWrapper = styled.div`
  display: flex;
  margin-bottom: var(--wick-medium-margin);

  & .ant-avatar {
    @media screen and (max-width: 600px) {
      width: 2rem;
      height: 2rem;
    }
  }
`;

const CommentItemLeft = styled.div``;
const CommentItemRight = styled.div`
  margin-left: 16px;
  flex: 1;
  min-width: 0;

  @media screen and (max-width: 600px) {
    margin-left: 0.8rem;
  }
`;
const CommentItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 15px;
  color: #252933;
  align-items: center;
`;
const CommentItemUsername = styled.a`
  @media screen and (max-width: 600px) {
    font-size: 0.8rem;
  }
`;
const CommentItemTime = styled.div`
  font-size: 14px;
  color: #8a919f;
  line-height: 22px;
`;

const CommentItemMain = styled.div``;

const CommentItemContent = styled.div`
  width: 100%;
  color: #515767;
  margin-top: 8px;
`;

const CommentItemActions = styled.div`
  display: flex;

  & > div:not(:first-child) {
    margin-left: 12px;
  }
`;

const CommentItemActionItem = styled.div`
  display: flex;
  align-items: center;

  & > .ant-btn {
    width: 1em;
    padding: 0;
  }
`;
const CommentItemActionItemCounter = styled.span`
  user-select: none;
  margin: 0 var(--wick-medium-margin);
`;

const CommentItemReplies = styled.div`
  margin-top: 16px;

  & .ant-card-body > div:first-child {
    margin-top: 0;
  }
`;

const ReadMoreRepliesWrapper = styled.div`
  margin-top: var(--wick-large-margin);
`;

const CommentItemUserBox = styled.div`
  display: flex;
`;

const CommentItemReplyBox = styled.div`
  padding: 0 12px;
  font-size: 14px;
  line-height: 22px;
  color: #8a919f;
  @media screen and (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const CommentItemParentReplyWrapper = styled.div`
  display: flex;
  background: #e8e8e8;
  border: 1px solid #e4e6eb;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 0 12px;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  color: #8a919f;
  margin: 8px 0;

  & > .ant-typography {
    margin-bottom: 0;
    line-height: 36px;
    color: #8a919f;
  }
`;

const SubCommentItemWrapper = styled.div`
  display: flex;
  margin-top: 16px;

  & .ant-avatar {
    @media screen and (max-width: 600px) {
      width: 2rem;
      height: 2rem;
    }
  }
`;

interface CommentItemBase {
  voteInfo?: IUserInteract;
  onVoteUp?: (id: string, categoryType: VoteCategoryType) => void;
  onVoteDown?: (id: string, categoryType: VoteCategoryType) => void;
  onPublish?: (content: string) => void;
  onReply?: (payload: Omit<ICreateReply, "article_id">) => Promise<boolean>;
}

interface CommentItemProps extends CommentItemBase {
  comment: IComments;
}

interface CommentRepliesProps extends CommentItemBase {
  reply: IReplies;
  rootCommentId: string;
}

function CommentRepliesItem({
  reply,
  rootCommentId,
  onReply,
  onVoteUp,
  onVoteDown,
}: CommentRepliesProps) {
  const commentContext = useContext(CommentContext);
  const showTextarea = commentContext?.activeTextarea === reply.id;
  const showReplyText = reply.parent_reply;
  const handleVoteUp = useCallback(() => {
    onVoteUp && onVoteUp(reply.id, VoteCategoryType.REPLY);
  }, [onVoteUp, reply]);

  const handleVoteDown = useCallback(() => {
    onVoteDown && onVoteDown(reply.id, VoteCategoryType.REPLY);
  }, [onVoteDown, reply]);

  const handleReply = async (content: string) => {
    if (onReply) {
      const isClose = await onReply({
        content,
        to_user_id: reply.from_user.id,
        root_comment_id: rootCommentId,
        parent_id: reply.id,
      });
      if (isClose) {
        commentContext?.onHideTextarea();
      }
    } else {
      commentContext?.onReply?.({
        content,
        root_comment_id: reply.parent_reply!.id,
        to_user_id: reply.from_user.id,
        parent_id: reply.id,
      });
    }
  };

  const voteDirection = useMemo(() => {
    if (reply.user_interact === undefined) {
      return undefined;
    }
    if (reply.user_interact?.is_vote_up) {
      return "up";
    } else if (!reply.user_interact?.is_vote_up) {
      return "down";
    }
  }, [reply.user_interact]);

  return (
    <SubCommentItemWrapper>
      <CommentItemLeft>
        <Avatar size="large" src={reply.from_user.avatar_url}></Avatar>
      </CommentItemLeft>
      <CommentItemRight>
        <CommentItemHeader>
          <CommentItemUserBox>
            <CommentItemUsername href={reply.from_user.github_home}>
              {reply.from_user.name}
            </CommentItemUsername>
            {showReplyText && (
              <>
                <CommentItemReplyBox>回复</CommentItemReplyBox>
                <CommentItemUsername href={reply.from_user.github_home}>
                  {reply.to_user.name}
                </CommentItemUsername>
              </>
            )}
          </CommentItemUserBox>
          <CommentItemTime>{reply.updatedAt}</CommentItemTime>
        </CommentItemHeader>
        <CommentItemMain>
          <CommentItemContent>
            <MarkdownPreview>{reply.content}</MarkdownPreview>
            {showReplyText && (
              <CommentItemParentReplyWrapper>
                {reply.parent_reply!.content}
              </CommentItemParentReplyWrapper>
            )}
          </CommentItemContent>
          <CommentItemActions>
            <CommentItemActionItem>
              <Button
                type="link"
                style={{
                  width: "auto",
                  color:
                    voteDirection === undefined
                      ? "rgb(207, 210, 214)"
                      : voteDirection === "up"
                        ? "rgb(244, 130, 37)"
                        : "rgb(207, 210, 214)",
                }}
                onClick={handleVoteUp}
                icon={<ArrowUpIcon size={16} />}
              ></Button>
              <CommentItemActionItemCounter>
                {reply.voteUpCount - reply.voteDownCount}
              </CommentItemActionItemCounter>
              <Button
                type="link"
                style={{
                  width: "auto",
                  color:
                    voteDirection === undefined
                      ? "rgb(207, 210, 214)"
                      : voteDirection === "down"
                        ? "rgb(244, 130, 37)"
                        : "rgb(207, 210, 214)",
                }}
                onClick={handleVoteDown}
                icon={<ArrowDownIcon size={16} />}
              ></Button>
            </CommentItemActionItem>
            <CommentItemActionItem>
              <Button
                type="link"
                style={{
                  width: "auto",
                }}
                onClick={() => {
                  commentContext?.onShowTextarea(reply.id);
                }}
                icon={<CommentIcon size={16}></CommentIcon>}
              ></Button>
            </CommentItemActionItem>
          </CommentItemActions>
          {showTextarea && (
            <CommentTextarea
              onReply={handleReply}
              placeholder={`回复 ${reply.from_user.name}: `}
            ></CommentTextarea>
          )}
        </CommentItemMain>
      </CommentItemRight>
    </SubCommentItemWrapper>
  );
}

export default function CommentItem({
  comment,
  voteInfo,
  onPublish,
  onReply,
  onVoteUp,
  onVoteDown,
}: CommentItemProps) {
  const commentContext = useContext(CommentContext);
  const showTextarea = commentContext?.activeTextarea === comment.id;
  const [page, setPage] = useState(1);

  const voteDirection = useMemo(() => {
    if (comment.user_interact === undefined) {
      return undefined;
    }
    if (comment.user_interact?.is_vote_up) {
      return "up";
    } else if (!comment.user_interact?.is_vote_up) {
      return "down";
    }
  }, [comment.user_interact]);

  const handleVoteUp = useCallback(() => {
    onVoteUp && onVoteUp(comment.id, VoteCategoryType.COMMENT);
  }, [onVoteUp, comment]);

  const handleVoteDown = useCallback(() => {
    onVoteDown && onVoteDown(comment.id, VoteCategoryType.COMMENT);
  }, [onVoteDown, comment]);

  const handleReply = async (content: string) => {
    if (onReply) {
      const isClose = await onReply({
        content,
        to_user_id: comment.replier_id,
        root_comment_id: comment.id,
      });

      if (isClose) {
        commentContext?.onHideTextarea();
      }
    }
  };
  const handleGetMoreReplies = (root_comment_id: string) => {
    commentContext?.onGetMoreReplies?.(root_comment_id, `${page}`);
    setPage(page + 1);
  };

  return comment ? (
    <CommentItemWrapper>
      <CommentItemLeft>
        <Avatar size={"default"} src={comment.user.avatar_url}></Avatar>
      </CommentItemLeft>
      <CommentItemRight>
        <CommentItemHeader>
          <CommentItemUsername href={comment.user.github_home}>
            {comment && comment.user && comment.user.name}
          </CommentItemUsername>
          <CommentItemTime>{comment && comment.updatedAt}</CommentItemTime>
        </CommentItemHeader>
        <CommentItemMain>
          <CommentItemContent>
            <MarkdownPreview>{comment.content}</MarkdownPreview>
          </CommentItemContent>
          <CommentItemActions>
            <CommentItemActionItem>
              <Button
                style={{
                  width: "auto",
                  color:
                    voteDirection === undefined
                      ? "rgb(207, 210, 214)"
                      : voteDirection === "up"
                        ? "rgb(244, 130, 37)"
                        : "rgb(207, 210, 214)",
                }}
                onClick={handleVoteUp}
                icon={<ArrowUpIcon size={16} />}
              ></Button>
              <CommentItemActionItemCounter>
                {comment.voteUpCount - comment.voteDownCount}
              </CommentItemActionItemCounter>
              <Button
                style={{
                  width: "auto",
                  color:
                    voteDirection === undefined
                      ? "rgb(207, 210, 214)"
                      : voteDirection === "down"
                        ? "rgb(244, 130, 37)"
                        : "rgb(207, 210, 214)",
                }}
                onClick={handleVoteDown}
                icon={<ArrowDownIcon size={16} />}
              ></Button>
            </CommentItemActionItem>
            <CommentItemActionItem>
              <Button
                style={{
                  width: "auto",
                }}
                onClick={() => {
                  commentContext?.onShowTextarea(comment.id);
                }}
                icon={<CommentIcon size={16}></CommentIcon>}
              ></Button>
            </CommentItemActionItem>
          </CommentItemActions>
          {showTextarea && (
            <CommentTextarea
              onReply={handleReply}
              placeholder={`回复 ${comment.user.name}: `}
            ></CommentTextarea>
          )}
        </CommentItemMain>
        {comment.replies.length !== 0 && (
          <CommentItemReplies>
            <Card
              style={{
                backgroundColor: "rgba(233,233,233,.5)",
              }}
            >
              {comment.replies?.map((reply, index) => {
                return (
                  <>
                    <CommentRepliesItem
                      key={reply.id}
                      rootCommentId={comment.id}
                      reply={reply}
                      onReply={onReply}
                      onVoteUp={onVoteUp}
                      onVoteDown={onVoteDown}
                    ></CommentRepliesItem>
                  </>
                );
              })}
              {comment.replies.length < comment.reply_count && (
                <ReadMoreRepliesWrapper>
                  <Button
                    onClick={() => handleGetMoreReplies(comment.id)}
                    block
                    type="primary"
                  >
                    查看更多回复
                  </Button>
                </ReadMoreRepliesWrapper>
              )}
            </Card>
          </CommentItemReplies>
        )}
      </CommentItemRight>
    </CommentItemWrapper>
  ) : null;
}
