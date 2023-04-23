import { ArrowUpIcon, CommentIcon } from "@/stories/Common/icon";
import MarkdownPreview from "@/stories/MarkdownPreview/MarkdownPreview";
import { Avatar, Button, Typography } from "antd";
import Card from "antd/es/card/Card";
import styled from "styled-components";

const { Paragraph, Text } = Typography;

interface CommentItemWrapperProps {
  sub?: boolean;
}
const CommentItemWrapper = styled.div<CommentItemWrapperProps>`
  display: flex;
  overflow: hidden;
`;
const CommentItemLeft = styled.div``;
const CommentItemRight = styled.div`
  margin-left: 16px;
  flex: 1;
  min-width: 0;
`;
const CommentItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 15px;
  color: #252933;
  align-items: center;
`;
const CommentItemUsername = styled.div``;
const CommentItemTime = styled.div`
  font-size: 14px;
  color: #8a919f;
  line-height: 22px;
`;

const CommentItemMain = styled.div`
  overflow: hidden;
  /* display: flex;
  flex-direction: column; */
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
  margin-left: 6px;
`;

const CommentItemSub = styled.div`
  overflow: hidden;
  margin-top: 16px;

  & .ant-card-body > div:first-child {
    margin-top: 0;
  }
`;

interface UserInfoProps {
  username: string;
  avatarUrl: string;
}

interface SubCommentProps {
  comment: {
    parentId: string;
    commentId: string;
    userInfo: UserInfoProps;
    replyUser?: UserInfoProps;
    parentReply?: {
      content: string;
    };
    content: string;
  };
}

interface CommentProps {
  commentId: string;
  userInfo: UserInfoProps;
  content: string;
  subComment?: Array<SubCommentProps["comment"]>;
}

interface CommentItemProps {
  comment: CommentProps;
  sub?: boolean;
}

const CommentItemUserBox = styled.div`
  display: flex;
`;

const CommentItemReplyBox = styled.div`
  padding: 0 12px;
  font-size: 14px;
  line-height: 22px;
  color: #8a919f;
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

const SubCommentItemWrapper = styled.div<CommentItemWrapperProps>`
  display: flex;
  overflow: hidden;
  margin-top: 16px;
`;

function CommentItemInternal({ comment }: SubCommentProps) {
  return (
    <SubCommentItemWrapper>
      <CommentItemLeft>
        <Avatar size="large" src="freddie.jpg"></Avatar>
      </CommentItemLeft>
      <CommentItemRight>
        <CommentItemHeader>
          <CommentItemUserBox>
            <CommentItemUsername>
              {comment.userInfo.username}
            </CommentItemUsername>
            {comment.parentReply && (
              <>
                <CommentItemReplyBox>回复</CommentItemReplyBox>
                <CommentItemUsername>
                  {comment.replyUser?.username}
                </CommentItemUsername>
              </>
            )}
          </CommentItemUserBox>
          <CommentItemTime>8 天前</CommentItemTime>
        </CommentItemHeader>
        <CommentItemMain>
          <CommentItemContent>
            {comment.parentReply && (
              <CommentItemParentReplyWrapper>
                &quot;
                <Paragraph ellipsis={{ rows: 1 }}>
                  {comment.parentReply.content}
                </Paragraph>
                &quot;
              </CommentItemParentReplyWrapper>
            )}
            <MarkdownPreview>{comment.content}</MarkdownPreview>
          </CommentItemContent>
          <CommentItemActions>
            <CommentItemActionItem>
              <Button type="link" ghost icon={<ArrowUpIcon />}></Button>
              <CommentItemActionItemCounter>888</CommentItemActionItemCounter>
            </CommentItemActionItem>
            <CommentItemActionItem>
              <Button
                type="link"
                ghost
                icon={<CommentIcon></CommentIcon>}
              ></Button>
              <CommentItemActionItemCounter>888</CommentItemActionItemCounter>
            </CommentItemActionItem>
          </CommentItemActions>
        </CommentItemMain>
      </CommentItemRight>
    </SubCommentItemWrapper>
  );
}

export default function CommentItem({ comment, sub }: CommentItemProps) {
  return (
    <CommentItemWrapper sub={sub}>
      <CommentItemLeft>
        <Avatar size={52} src="freddie.jpg"></Avatar>
      </CommentItemLeft>
      <CommentItemRight>
        <CommentItemHeader>
          <CommentItemUsername>
            {comment && comment.userInfo.username}
          </CommentItemUsername>
          <CommentItemTime>8 天前</CommentItemTime>
        </CommentItemHeader>
        <CommentItemMain>
          <CommentItemContent>
            <MarkdownPreview>{comment.content}</MarkdownPreview>
          </CommentItemContent>
          <CommentItemActions>
            <CommentItemActionItem>
              <Button type="link" ghost icon={<ArrowUpIcon />}></Button>
              <CommentItemActionItemCounter>888</CommentItemActionItemCounter>
            </CommentItemActionItem>
            <CommentItemActionItem>
              <Button
                type="link"
                ghost
                icon={<CommentIcon></CommentIcon>}
              ></Button>
              <CommentItemActionItemCounter>888</CommentItemActionItemCounter>
            </CommentItemActionItem>
          </CommentItemActions>
        </CommentItemMain>
        {comment.subComment && (
          <CommentItemSub>
            <Card
              style={{
                backgroundColor: "rgba(233,233,233,.5)",
              }}
            >
              {comment.subComment?.map((sub, index) => (
                <CommentItemInternal
                  key={index}
                  comment={sub}
                ></CommentItemInternal>
              ))}
            </Card>
          </CommentItemSub>
        )}
      </CommentItemRight>
    </CommentItemWrapper>
  );
}
