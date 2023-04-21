import { Meta, StoryObj } from "@storybook/react";
import SiteConfig from "./SiteConfig";

const meta: Meta<typeof SiteConfig> = {
  title: "SiteConfig",
  component: SiteConfig,
};

export default meta;
type Story = StoryObj<typeof SiteConfig>;

export const Common: Story = {
  render() {
    return (
      <SiteConfig config={{ copyright: "123456", approve: "闽" }}></SiteConfig>
    );
  },
};
