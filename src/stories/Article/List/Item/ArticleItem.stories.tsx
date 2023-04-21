import { Meta, StoryObj } from "@storybook/react";
import ArticleItem from "./ArticleItem";

const meta: Meta<typeof ArticleItem> = {
  title: "Article/ArticleItem",
  component: ArticleItem,
};

export default meta;
type Story = StoryObj<typeof ArticleItem>;

export const Common: Story = {
  render() {
    return <ArticleItem></ArticleItem>;
  },
};
