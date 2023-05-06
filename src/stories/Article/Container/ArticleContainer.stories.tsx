import { Meta, StoryObj } from "@storybook/react";
import ArticleContainer from "./ArticleContainer";

const meta: Meta<typeof ArticleContainer> = {
  title: "Article/Container",
  component: ArticleContainer,
};

export default meta;

type Story = StoryObj<typeof ArticleContainer>;

export const Common: Story = {
  render() {
    return <ArticleContainer />;
  },
};
