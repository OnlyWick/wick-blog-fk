import { Meta, StoryObj } from "@storybook/react";
import Overview from "./Overview";

const meta: Meta<typeof Overview> = {
  title: "Overview/Common",
  component: Overview,
};

export default meta;
type Story = StoryObj<typeof Overview>;

export const Common: Story = {
  render() {
    return (
      <>
        <Overview />
      </>
    );
  },
};
