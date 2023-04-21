import { Meta, StoryObj } from "@storybook/react";
import Intro from ".";

const meta: Meta<typeof Intro> = {
  title: "Home/Info",
  component: Intro,
};

export default meta;
type Story = StoryObj<typeof Intro>;

export const Common: Story = {
  render() {
    return (
      <Intro
        config={{ username: "OnlyWick", intro: ["Wick", "OnlyWick"] }}
      ></Intro>
    );
  },
};
