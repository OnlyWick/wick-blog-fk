import { Meta, StoryObj } from "@storybook/react";
import HomeNav from ".";

const meta: Meta<typeof HomeNav> = {
  title: "Nav/Home",
  component: HomeNav,
};

export default meta;
type Story = StoryObj<typeof HomeNav>;

export const Common: Story = {
  render() {
    return <HomeNav />;
  },
};
