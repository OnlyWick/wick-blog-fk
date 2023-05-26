import { Meta, StoryObj } from "@storybook/react";
import TopNav from "./TopNav";

const meta: Meta<typeof TopNav> = {
  title: "Nav/TopNav/TopNav",
  component: TopNav,
};
export default meta;

type Story = StoryObj<typeof TopNav>;

export const Common: Story = {
  render() {
    return <TopNav></TopNav>;
  },
};
