import { Meta, StoryObj } from "@storybook/react";
import CommentItem from "./CommentItem";

const meta: Meta<typeof CommentItem> = {
  title: "Comment/Item",
  component: CommentItem,
};

export default meta;
type Story = StoryObj<typeof CommentItem>;

export const Common: Story = {
  render() {
    return (
      <>
        <CommentItem
          comment={{
            commentId: "12345",
            content: "Hi Wick",
            userInfo: {
              avatarUrl: "freddie.jpg",
              username: "Wick",
            },
            subComment: [
              {
                commentId: "6666",
                parentId: "12345",
                userInfo: {
                  avatarUrl: "freddie.jpg",
                  username: "OnlyWick",
                },
                content: "来自 OnlyWick 的回复",
                replyUser: {
                  avatarUrl: "freddie.jpg",
                  username: "Wick",
                },
              },
              {
                commentId: "6666",
                parentId: "12345",
                userInfo: {
                  avatarUrl: "freddie.jpg",
                  username: "OnlyWick",
                },
                content: "你在教我做事",
                parentReply: {
                  content: `Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. `,
                },
                replyUser: {
                  avatarUrl: "freddie.jpg",
                  username: "Wick",
                },
              },
            ],
          }}
        ></CommentItem>
      </>
    );
  },
};
