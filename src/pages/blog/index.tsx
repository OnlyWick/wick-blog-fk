import Layout from "@/stories/Layout";
import Header from "@/stories/Layout/Header/Header";
import TopNav from "@/stories/TopNav/TopNav";
import dynamic from "next/dynamic";

const ArticleList = dynamic(
  () => import("@/stories/Article/List/ArticleList"),
  {
    loading: () => <div>Fuck You</div>,
  }
);

const ArticleItem = dynamic(
  () => import("@/stories/Article/List/Item/ArticleItem"),
  {
    loading: () => <div>Fuck You</div>,
  }
);

export default function Blog() {
  return (
    <>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <TopNav></TopNav>
        </Header>
        <ArticleList>
          <ArticleItem></ArticleItem>
          <ArticleItem></ArticleItem>
          <ArticleItem></ArticleItem>
          <ArticleItem></ArticleItem>
        </ArticleList>
      </Layout>
    </>
  );
}
