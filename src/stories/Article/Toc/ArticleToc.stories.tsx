import { Meta, StoryObj } from "@storybook/react";
import ArticleToc from "./ArticleToc";

const meta: Meta<typeof ArticleToc> = {
  title: "Article/Toc",
  component: ArticleToc,
};

export default meta;
type Story = StoryObj<typeof ArticleToc>;

export const Common: Story = {
  render() {
    return (
      <>
        <h1>Hi Wick</h1>
        <h2>Hi Wick</h2>
        <h3>Hi Wick</h3>
        <ArticleToc></ArticleToc>
      </>
    );
  },
};
