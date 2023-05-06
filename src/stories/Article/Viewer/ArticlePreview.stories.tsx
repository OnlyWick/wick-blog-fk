import { Meta, StoryObj } from "@storybook/react";
import ArticleViewer from ".";

const meta: Meta<typeof ArticleViewer> = {
  title: "Article/ArticleViewer",
  component: ArticleViewer,
};

export default meta;
type Story = StoryObj<typeof ArticleViewer>;

export const Common: Story = {
  render() {
    return <ArticleViewer config={{} as any}></ArticleViewer>;
  },
};
