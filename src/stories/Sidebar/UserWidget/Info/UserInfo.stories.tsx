import { Meta, StoryObj } from "@storybook/react";
import UserInfo from ".";

const meta: Meta<typeof UserInfo> = {
  title: "Sidebar/UserWidget/UserInfo",
  component: UserInfo,
};

export default meta;
type Story = StoryObj<typeof UserInfo>;

export const Common: Story = {
  render() {
    return (
      <UserInfo
        config={{ username: "OnlyWick", intro: ["Wick", "OnlyWick"] }}
      ></UserInfo>
    );
  },
};
