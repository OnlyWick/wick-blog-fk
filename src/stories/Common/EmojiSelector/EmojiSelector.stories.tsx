import { Meta, StoryObj } from "@storybook/react";
import EmojiSelector from "./EmojiSelector";

const meta: Meta<typeof EmojiSelector> = {
  title: "Common/EmojiSelector",
  component: EmojiSelector,
};
export default meta;

type Story = StoryObj<typeof EmojiSelector>;
export const Common: Story = {
  render() {
    // return <EmojiSelector />;
    return <>Hi</>;
  },
};
