import ArticleContext from "@/Context/ArticleContext";
import IComments from "@/interfaces/DTO/IComments";
import IReplies from "@/interfaces/DTO/IReplies";
import ISubReply from "@/interfaces/DTO/Comment/ISubReply";
import { VoteCategoryType } from "@/interfaces/DTO/IVoteCommentOrReply";
import { ArrowUpIcon, CommentIcon } from "@/stories/Common/icon";
import ArrowDownIcon from "@/stories/Common/icon/ArrowDownIcon";
import MarkdownPreview from "@/stories/MarkdownPreview/MarkdownPreview";
// import MarkdownPreview from "@/stories/MarkdownPreview/MarkdownPreview";
import { Avatar, Button, Typography, Card } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CommentContext } from "../CommentContext";
import { CommentTextarea } from "../Textarea/CommentTextarea";
import { ICreateReply } from "@/interfaces/DTO/Comment/ICreateReply";
import { ReplyTypeEnum } from "@/interfaces/DTO/IReplyType";
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
  onVoteUp?: (id: string, categoryType: VoteCategoryType) => void;
  onVoteDown?: (id: string, categoryType: VoteCategoryType) => void;
  onPublish?: (content: string) => void;
  onReply?: (payload: Omit<ICreateReply, "article_id">) => Promise<boolean>;
}

interface CommentItemProps extends CommentItemBase {
  comment: IComments;
}

interface CommentRepliesProps extends CommentItemBase {
  replies: IReplies;
}

interface CommentSubRepliesProps extends CommentItemBase {
  subReply: ISubReply;
  parentId: string;
}

function CommentSubRepliesItem({
  subReply,
  parentId,
  onReply,
  onVoteUp,
  onVoteDown,
}: CommentSubRepliesProps) {
  const commentContext = useContext(CommentContext);
  const showTextarea = commentContext?.activeTextarea === subReply.id;
  const handleVoteUp = useCallback(() => {
    onVoteUp && onVoteUp(subReply!.id, VoteCategoryType.REPLY);
  }, [onVoteUp, subReply]);

  const handleVoteDown = useCallback(() => {
    onVoteDown && onVoteDown(subReply!.id, VoteCategoryType.REPLY);
  }, [onVoteDown, subReply]);

  const handleReply = async (content: string) => {
    if (onReply) {
      // TODO: 修改参数
      console.log(subReply, "666");
      const result = await onReply({
        content,
        reply_type: ReplyTypeEnum.REPLY_TYPE,
        to_user_id: subReply.from_user.id,
        root_reply_id: parentId,
        parent_id: subReply.id,
      });
      if (result) {
        commentContext?.onHideTextarea();
      }
    } else {
      // commentContext?.onReply?.({
      //   content,
      //   reply_type: ReplyTypeEnum.REPLY_TYPE,
      //   to_user_id: subReply.from_user.id,
      //   root_reply_id: subReply.id,
      // });
    }
  };

  return (
    <SubCommentItemWrapper>
      <CommentItemLeft>
        <Avatar size="large" src={subReply.from_user.avatar_url}></Avatar>
      </CommentItemLeft>
      <CommentItemRight>
        <CommentItemHeader>
          <CommentItemUserBox>
            <CommentItemUsername href={subReply.from_user.github_home}>
              {subReply.from_user.name}
            </CommentItemUsername>
            {subReply.parent_reply &&
              subReply.from_user.id !== subReply.to_user.id && (
                <CommentItemUserBox>
                  <CommentItemReplyBox>回复</CommentItemReplyBox>
                  <CommentItemUsername href={subReply.to_user.github_home}>
                    {subReply.to_user.name}
                  </CommentItemUsername>
                </CommentItemUserBox>
              )}
          </CommentItemUserBox>
          <CommentItemTime>{subReply.updatedAt}</CommentItemTime>
        </CommentItemHeader>
        <CommentItemMain>
          <CommentItemContent>
            {subReply.parent_reply && (
              <CommentItemParentReplyWrapper>
                <Paragraph ellipsis={true}>
                  {subReply.parent_reply?.content}
                </Paragraph>
              </CommentItemParentReplyWrapper>
            )}
            <MarkdownPreview>{subReply.content}</MarkdownPreview>
          </CommentItemContent>
          <CommentItemActions>
            <CommentItemActionItem>
              <Button
                type="link"
                style={{
                  width: "auto",
                }}
                onClick={handleVoteUp}
                icon={<ArrowUpIcon size={16} />}
              ></Button>
              <CommentItemActionItemCounter>
                {subReply.voteUpCount - subReply.voteDownCount}
              </CommentItemActionItemCounter>
              <Button
                type="link"
                style={{
                  width: "auto",
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
                  commentContext?.onShowTextarea(subReply.id);
                }}
                icon={<CommentIcon size={16}></CommentIcon>}
              ></Button>
            </CommentItemActionItem>
          </CommentItemActions>
          {showTextarea && (
            <CommentTextarea
              onReply={handleReply}
              placeholder={`回复 ${subReply.from_user.name}: `}
            ></CommentTextarea>
          )}
        </CommentItemMain>
      </CommentItemRight>
    </SubCommentItemWrapper>
  );
}

function CommentRepliesItem({
  replies,
  onReply,
  onVoteUp,
  onVoteDown,
}: CommentRepliesProps) {
  const articleContext = useContext(ArticleContext); // FIXME: 不应该出现这个 context
  const commentContext = useContext(CommentContext);
  const showTextarea = commentContext?.activeTextarea === replies.from_user.id;
  const handleVoteUp = useCallback(() => {
    onVoteUp && onVoteUp(replies.id, VoteCategoryType.REPLY);
  }, [onVoteUp, replies]);

  const handleVoteDown = useCallback(() => {
    onVoteDown && onVoteDown(replies.id, VoteCategoryType.REPLY);
  }, [onVoteDown, replies]);

  const handleGetMoreReply = useCallback(
    (root_reply_id: string) => {
      articleContext?.getMoreSubReply(root_reply_id);
    },
    [articleContext]
  );

  const handleReply = async (content: string) => {
    if (onReply) {
      const isClose = await onReply({
        content,
        reply_type: ReplyTypeEnum.REPLY_TYPE,
        to_user_id: replies.from_user.id,
        root_reply_id: replies.id,
        parent_id: replies.id,
      });
      if (isClose) {
        commentContext?.onHideTextarea();
      }
    } else {
      commentContext?.onReply?.({
        content,
        reply_type: ReplyTypeEnum.REPLY_TYPE,
        to_user_id: replies.from_user.id,
        root_reply_id: replies.id,
      });
    }
  };

  return (
    <SubCommentItemWrapper>
      <CommentItemLeft>
        <Avatar size="large" src={replies.from_user.avatar_url}></Avatar>
      </CommentItemLeft>
      <CommentItemRight>
        <CommentItemHeader>
          <CommentItemUserBox>
            <CommentItemUsername href={replies.from_user.github_home}>
              {replies.from_user.name}
            </CommentItemUsername>
          </CommentItemUserBox>
          <CommentItemTime>{replies.updatedAt}</CommentItemTime>
        </CommentItemHeader>
        <CommentItemMain>
          <CommentItemContent>
            <MarkdownPreview>{replies.content}</MarkdownPreview>
          </CommentItemContent>
          <CommentItemActions>
            <CommentItemActionItem>
              <Button
                type="link"
                style={{
                  width: "auto",
                }}
                onClick={handleVoteUp}
                icon={<ArrowUpIcon size={16} />}
              ></Button>
              <CommentItemActionItemCounter>
                {replies.voteUpCount - replies.voteDownCount}
              </CommentItemActionItemCounter>
              <Button
                type="link"
                style={{
                  width: "auto",
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
                  commentContext?.onShowTextarea(replies.from_user.id);
                }}
                icon={<CommentIcon size={16}></CommentIcon>}
              ></Button>
            </CommentItemActionItem>
          </CommentItemActions>
          {showTextarea && (
            <CommentTextarea
              onReply={handleReply}
              placeholder={`回复 ${replies.from_user.name}: `}
            ></CommentTextarea>
          )}
          {replies.sub_reply.map((sub) => {
            return (
              <CommentSubRepliesItem
                key={sub.id}
                subReply={sub}
                parentId={replies.id}
                onReply={onReply}
                onVoteUp={onVoteUp}
                onVoteDown={onVoteDown}
              ></CommentSubRepliesItem>
            );
          })}
          {replies.sub_reply_count > 2 ? (
            <SubCommentItemWrapper>
              <CommentItemLeft style={{ width: "40px" }}></CommentItemLeft>
              <CommentItemRight>
                <Button
                  type="link"
                  style={{
                    marginTop: "var(--wick-medium-margin)",
                    padding: 0,
                  }}
                  onClick={() => {
                    handleGetMoreReply(replies.id);
                  }}
                >
                  查看更多回复
                </Button>
              </CommentItemRight>
            </SubCommentItemWrapper>
          ) : null}
        </CommentItemMain>
      </CommentItemRight>
    </SubCommentItemWrapper>
  );
}

export default function CommentItem({
  comment,
  onPublish,
  onReply,
  onVoteUp,
  onVoteDown,
}: CommentItemProps) {
  const commentContext = useContext(CommentContext);
  const showTextarea = commentContext?.activeTextarea === comment.id;

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
        root_comment_id: comment.id,
        reply_type: ReplyTypeEnum.COMMENT_TYPE,
        to_user_id: comment.author_id,
      });

      if (isClose) {
        commentContext?.onHideTextarea();
      }
    }
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
                type="link"
                style={{
                  width: "auto",
                }}
                onClick={handleVoteUp}
                icon={<ArrowUpIcon size={16} />}
              ></Button>
              <CommentItemActionItemCounter>
                {comment.voteUpCount - comment.voteDownCount}
              </CommentItemActionItemCounter>
              <Button
                type="link"
                style={{
                  width: "auto",
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
                  <CommentRepliesItem
                    key={reply.id}
                    replies={reply}
                    onReply={onReply}
                    onVoteUp={onVoteUp}
                    onVoteDown={onVoteDown}
                  ></CommentRepliesItem>
                );
              })}
            </Card>
          </CommentItemReplies>
        )}
      </CommentItemRight>
    </CommentItemWrapper>
  ) : null;
}
