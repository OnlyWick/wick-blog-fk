import { StoryObj } from "@storybook/react";
import UserConnect from "./UserConnect";

const meta = {
  title: "Sidebar/UserWidget/Connect",
  component: UserConnect,
};

export default meta;
type Story = StoryObj<typeof UserConnect>;

export const Common: Story = {
  render() {
    return <UserConnect />;
  },
};
