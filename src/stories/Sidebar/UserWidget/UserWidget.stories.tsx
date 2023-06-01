import { StoryObj } from "@storybook/react";
import UserWidget from ".";

const meta = {
  title: "Sidebar/UserWidget",
  component: UserWidget,
};

export default meta;
type Story = StoryObj<typeof UserWidget>;

export const Common: Story = {
  render() {
    return <UserWidget />;
  },
};
