import Home from ".";
import Info from "./Intro";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Home> = {
  title: "Home",
  component: Home,
};

export default meta;
type Story = StoryObj<typeof Home>;

export const Common: Story = {
  render() {
    return (
      <Home>
        <Info></Info>
      </Home>
    );
  },
};
