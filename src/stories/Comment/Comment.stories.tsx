import { Meta, StoryObj } from "@storybook/react";
import Comment from "./Comment";

const meta: Meta<typeof Comment> = {
  title: "Comment/Comment",
  component: Comment,
};
export default meta;

type Story = StoryObj<typeof Comment>;

export const Common: Story = {
  render() {
    return <Comment></Comment>;
  },
};
