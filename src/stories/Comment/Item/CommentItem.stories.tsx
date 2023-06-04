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
        <CommentItem></CommentItem>
      </>
    );
  },
};
