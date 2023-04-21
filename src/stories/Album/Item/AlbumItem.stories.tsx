import { Meta, StoryObj } from "@storybook/react";
import AlbumItem from "./AlbumItem";

const meta: Meta<typeof AlbumItem> = {
  title: "Album/AlbumItem",
  component: AlbumItem,
};

export default meta;
type Story = StoryObj<typeof AlbumItem>;

export const Common: Story = {
  render() {
    return <AlbumItem></AlbumItem>;
  },
};
