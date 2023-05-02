import { Meta, StoryObj } from "@storybook/react";
import Column from ".";

const meta: Meta<typeof Column> = {
  title: "Column/Column",
  component: Column,
};
export default meta;
type Story = StoryObj<typeof Column>;

export const Common: Story = {
  render() {
    return <Column />;
  },
};
