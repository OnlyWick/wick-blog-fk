import styled from "styled-components";
import CommentHeader from "./Header/CommentHeader";
import CommentItem from "./Item/CommentItem";
import { Button, Card } from "@douyinfe/semi-ui";
import {
  ChangeEvent,
  FocusEventHandler,
  useState,
} from "react";
import IReturnComments from "@/interfaces/DTO/IReturnComments";
import { VoteCategoryType } from "@/interfaces/DTO/IVoteCommentOrReply";
import { EmojiArrayType } from "../Common/EmojiSelector/EmojiSelector";
import { CommentContext } from "./CommentContext";
import { ICreateReply } from "@/interfaces/DTO/Comment/ICreateReply";

const CommentListWrapper = styled.div`
  margin-top: 32px;
`;

const ReadMoreCommentsWrapper = styled.div`
  margin-top: var(--wick-large-margin);
`;

interface CommentProps {
  commentData?: IReturnComments;
  value?: string;
  onLogin?: () => void;
  onEmojiSelect?: (data: string) => void;
  onPublish?: (content: string) => void;
  onReply?: (payload: Omit<ICreateReply, "article_id">) => Promise<boolean>;
  onGetMoreComments?: (page: string) => void;
  onGetMoreReplies?: (commentId: string, page: string) => void;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  onVoteUp?: (id: string, categoryType: VoteCategoryType) => void;
  onVoteDown?: (id: string, categoryType: VoteCategoryType) => void;
  emojiList?: EmojiArrayType;
}
// TODO: 组件内部使用 context 还差不多, 但是用户不需要传递 context
export default function Comment({
  commentData,
  value,
  emojiList,
  onLogin,
  onEmojiSelect,
  onPublish,
  onReply,
  onGetMoreComments,
  onGetMoreReplies,
  onChange,
  onBlur,
  onVoteUp,
  onVoteDown,
}: CommentProps) {
  const [activeTextarea, setActiveTextarea] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const handleShowTextarea = (commentOrReplyId: string) => {
    setActiveTextarea(commentOrReplyId);
  };

  const handleHideTextarea = () => {
    setActiveTextarea(null);
  };
  const handleGetMoreComments = () => {
    onGetMoreComments?.(`${page}`);
    setPage(page + 1);
  };

  return (
    <CommentContext.Provider
      value={{
        value,
        activeTextarea,
        onEmojiSelect,
        onPublish,
        onReply,
        onGetMoreReplies,
        onChange,
        onBlur,
        onShowTextarea: handleShowTextarea,
        onHideTextarea: handleHideTextarea,
        emojiList: emojiList || [],
      }}
    >
      <div>
        <CommentHeader
          onLogin={onLogin}
          onPublish={onPublish}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          commentCount={commentData?.total_count}
        ></CommentHeader>
        <CommentListWrapper>
          {Array.isArray(commentData?.data) &&
            commentData?.data.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                voteInfo={comment.user_interact}
                onPublish={onPublish}
                onReply={onReply}
                onVoteUp={onVoteUp}
                onVoteDown={onVoteDown}
              ></CommentItem>
            ))}
        </CommentListWrapper>
        {commentData &&
          commentData.comment_count > commentData.data.length && (
            <ReadMoreCommentsWrapper>
              <Button onClick={handleGetMoreComments} block type="primary">
                查看更多回复
              </Button>
            </ReadMoreCommentsWrapper>
          )}
      </div>
    </CommentContext.Provider>
  );
}
