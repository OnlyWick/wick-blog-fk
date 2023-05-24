import { Meta, StoryObj } from "@storybook/react";
import ArticleFilter from "./ArticleFilter";

const meta: Meta<typeof ArticleFilter> = {
  title: "Article/Filter",
  component: ArticleFilter,
};

export default meta;
type Story = StoryObj<typeof ArticleFilter>;

export const Common: Story = {
  render() {
    return (
      <>
        <ArticleFilter />
      </>
    );
  },
};
