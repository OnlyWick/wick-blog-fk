import { Meta, StoryObj } from "@storybook/react";
import ArticleAction from "./ArticleAction";

const meta: Meta<typeof ArticleAction> = {
  title: "Article/Action",
  component: ArticleAction,
};

export default meta;

type Story = StoryObj<typeof ArticleAction>;

export const Common: Story = {
  render() {
    return <ArticleAction></ArticleAction>;
  },
};
