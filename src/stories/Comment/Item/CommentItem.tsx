import ArticleContext from "@/Context/ArticleContext";
import IComments from "@/interfaces/DTO/IComments";
import IReplies from "@/interfaces/DTO/IReplies";
import ISubReply from "@/interfaces/DTO/ISubReply";
import { VoteCategoryType } from "@/interfaces/DTO/IVoteCommentOrReply";
import { ArrowUpIcon, CommentIcon } from "@/stories/Common/icon";
import ArrowDownIcon from "@/stories/Common/icon/ArrowDownIcon";
import MarkdownPreview from "@/stories/MarkdownPreview/MarkdownPreview";
// import MarkdownPreview from "@/stories/MarkdownPreview/MarkdownPreview";
import { Avatar, Button, Typography, Card } from "antd";
import { useCallback, useContext, useEffect } from "react";
import styled from "styled-components";

const CommentItemWrapper = styled.div`
  display: flex;
  overflow: hidden;
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

const CommentItemMain = styled.div`
  overflow: hidden;
`;

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
  overflow: hidden;
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
  overflow: hidden;
  margin-top: 16px;

  & .ant-avatar {
    @media screen and (max-width: 600px) {
      width: 2rem;
      height: 2rem;
    }
  }
`;

interface CommentItemProps {
  comment?: IComments;
  onVoteUp?: (id: string, categoryType: VoteCategoryType) => void;
  onVoteDown?: (id: string, categoryType: VoteCategoryType) => void;
}

interface CommentRepliesProps {
  replies: IReplies;
  onVoteUp?: (id: string, categoryType: VoteCategoryType) => void;
  onVoteDown?: (id: string, categoryType: VoteCategoryType) => void;
}

interface CommentSubRepliesProps {
  subReply: ISubReply;
  onVoteUp?: (id: string, categoryType: VoteCategoryType) => void;
  onVoteDown?: (id: string, categoryType: VoteCategoryType) => void;
}

function CommentSubRepliesItem({
  subReply,
  onVoteUp,
  onVoteDown,
}: CommentSubRepliesProps) {
  const handleVoteUp = useCallback(() => {
    onVoteUp && onVoteUp(subReply!.id, VoteCategoryType.REPLY);
  }, [onVoteUp, subReply]);

  const handleVoteDown = useCallback(() => {
    onVoteDown && onVoteDown(subReply!.id, VoteCategoryType.REPLY);
  }, [onVoteDown, subReply]);

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
            {subReply.to_user && (
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
                icon={<CommentIcon size={16}></CommentIcon>}
              ></Button>
            </CommentItemActionItem>
          </CommentItemActions>
        </CommentItemMain>
      </CommentItemRight>
    </SubCommentItemWrapper>
  );
}

function CommentRepliesItem({
  replies,
  onVoteUp,
  onVoteDown,
}: CommentRepliesProps) {
  const articleContext = useContext(ArticleContext);
  const handleVoteUp = useCallback(() => {
    onVoteUp && onVoteUp(replies!.id, VoteCategoryType.REPLY);
  }, [onVoteUp, replies]);

  const handleVoteDown = useCallback(() => {
    onVoteDown && onVoteDown(replies!.id, VoteCategoryType.REPLY);
  }, [onVoteDown, replies]);

  const handleGetMoreReply = useCallback(
    (root_reply_id: string) => {
      articleContext?.getMoreSubReply(root_reply_id);
    },
    [articleContext]
  );

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
                icon={<CommentIcon size={16}></CommentIcon>}
              ></Button>
            </CommentItemActionItem>
          </CommentItemActions>
          {replies.sub_reply.map((sub) => {
            return (
              <CommentSubRepliesItem
                key={sub.id}
                subReply={sub}
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
  onVoteUp,
  onVoteDown,
}: CommentItemProps) {
  const handleVoteUp = useCallback(() => {
    onVoteUp && onVoteUp(comment!.id, VoteCategoryType.COMMENT);
  }, [onVoteUp, comment]);

  const handleVoteDown = useCallback(() => {
    onVoteDown && onVoteDown(comment!.id, VoteCategoryType.COMMENT);
  }, [onVoteDown, comment]);

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
                icon={<CommentIcon size={16}></CommentIcon>}
              ></Button>
            </CommentItemActionItem>
          </CommentItemActions>
        </CommentItemMain>
        {comment.replies.length !== 0 && (
          <CommentItemReplies>
            <Card
              style={{
                backgroundColor: "rgba(233,233,233,.5)",
              }}
            >
              {comment.replies?.map((reply) => {
                return (
                  <CommentRepliesItem
                    key={reply.id}
                    replies={reply}
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
