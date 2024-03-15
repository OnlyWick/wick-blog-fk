// import AlbumItem from "@/stories/Album/Item/AlbumItem";
import Layout from "@/stories/Layout";
import Content from "@/stories/Layout/Content/Content";
import Header from "@/stories/Layout/Header/Header";
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
        </Header>
        <Content>
          <AlbumItem mode={albumState}></AlbumItem>
        </Content>
      </Layout>
    </>
  );
}
