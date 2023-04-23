import { Meta, StoryObj } from "@storybook/react";
import CommentHeader from "./CommentHeader";

const meta: Meta<typeof CommentHeader> = {
  title: "Comment/Header",
  component: CommentHeader,
};
export default meta;
type Story = StoryObj<typeof CommentHeader>;

export const Common: Story = {
  render() {
    return <CommentHeader />;
  },
};
