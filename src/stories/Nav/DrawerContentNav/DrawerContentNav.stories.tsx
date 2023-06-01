import { Meta, StoryObj } from "@storybook/react";
import DrawerContentNav from ".";

const meta: Meta<typeof DrawerContentNav> = {
  title: "Nav/DrawerContentNav",
  component: DrawerContentNav,
};

export default meta;
type Story = StoryObj<typeof DrawerContentNav>;

export const Common: Story = {
  render() {
    return <DrawerContentNav></DrawerContentNav>;
  },
};
