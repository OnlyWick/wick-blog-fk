import { Meta, StoryObj } from "@storybook/react";
import ArticleList from "./ArticleList";
import ArticleItem from "./Item/ArticleItem";

const meta: Meta<typeof ArticleList> = {
  title: "Article/ArticleList",
  component: ArticleList,
};

export default meta;
type Story = StoryObj<typeof ArticleList>;

export const Common: Story = {
  render() {
    return (
      <ArticleList>
        <ArticleItem></ArticleItem>
        <ArticleItem></ArticleItem>
      </ArticleList>
    );
  },
};
