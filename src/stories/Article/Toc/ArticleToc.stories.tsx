import { Meta, StoryObj } from "@storybook/react";
import ArticleToc from "./ArticleToc";
import { MutableRefObject, useRef, useState } from "react";

const meta: Meta<typeof ArticleToc> = {
  title: "Article/Toc",
  component: ArticleToc,
};

export default meta;
type Story = StoryObj<typeof ArticleToc>;

const Test = () => {
  return (
    <>
      <div className="article">
        <h1>1</h1>
        <h2>2</h2>
        <h3>3</h3>
        <h1>1</h1>
        <h1>2</h1>
        <h1>3</h1>
      </div>
      <ArticleToc source=".article"></ArticleToc>
    </>
  );
};

export const Common: Story = {
  render() {
    return Test();
  },
};
