// import AlbumItem from "@/stories/Album/Item/AlbumItem";
import Layout from "@/stories/Layout";
import Content from "@/stories/Layout/Content/Content";
import Header from "@/stories/Layout/Header/Header";
import { Segmented } from "antd";
import dynamic from "next/dynamic";
import { useState } from "react";

const AlbumItem = dynamic(() => import("@/stories/Album/Item/AlbumItem"));

export default function Album() {
  const [albumState, setAlbumState] = useState<"thumbnail" | "detail">(
    "thumbnail"
  );
  const handleSegmentedChange = (state: "thumbnail" | "detail") => {
    setAlbumState(state);
  };

  return (
    <>
      <Layout style={{ height: "100%" }}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Segmented
            size="middle"
            onChange={(value) => {
              if (value === "thumbnail") {
                handleSegmentedChange(value);
              } else if (value === "detail") {
                handleSegmentedChange(value);
              }
            }}
            style={{
              background: "rgb(208 208 208)",
            }}
            options={[
              { label: "缩略", value: "thumbnail" },
              { label: "详细", value: "detail" },
            ]}
          ></Segmented>
        </Header>
        <Content>
          <AlbumItem mode={albumState}></AlbumItem>
        </Content>
      </Layout>
    </>
  );
}
