import styled from "styled-components";
import CommentHeader from "./Header/CommentHeader";
import CommentItem from "./Item/CommentItem";
import { Card } from "antd";

const CommentWrapper = styled.div`
  width: 100%;
`;
const CommentListWrapper = styled.div`
  margin-top: 32px;
`;
export default function Comment() {
  return (
    <CommentWrapper>
      <Card>
        <CommentHeader></CommentHeader>
        <CommentListWrapper>
          <CommentItem
            comment={{
              commentId: "12345",
              content: "Hi Wick",
              userInfo: {
                avatarUrl: "/freddie.jpg",
                username: "Wick",
              },
              subComment: [
                {
                  commentId: "6666",
                  parentId: "12345",
                  userInfo: {
                    avatarUrl: "/freddie.jpg",
                    username: "OnlyWick",
                  },
                  content: "来自 OnlyWick 的回复",
                  replyUser: {
                    avatarUrl: "/freddie.jpg",
                    username: "Wick",
                  },
                },
                {
                  commentId: "6666",
                  parentId: "12345",
                  userInfo: {
                    avatarUrl: "/freddie.jpg",
                    username: "OnlyWick",
                  },
                  content: "你在教我做事",
                  parentReply: {
                    content: `Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. `,
                  },
                  replyUser: {
                    avatarUrl: "/freddie.jpg",
                    username: "Wick",
                  },
                },
              ],
            }}
          ></CommentItem>
        </CommentListWrapper>
      </Card>
    </CommentWrapper>
  );
}