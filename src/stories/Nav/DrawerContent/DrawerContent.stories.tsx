import { Meta, StoryObj } from "@storybook/react";
import DrawerContent from ".";

const meta: Meta<typeof DrawerContent> = {
  title: "Nav/DrawerContent",
  component: DrawerContent,
};

export default meta;
type Story = StoryObj<typeof DrawerContent>;

export const Common: Story = {
  render() {
    return <DrawerContent></DrawerContent>;
  },
};
