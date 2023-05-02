import SiteConfig from "@/stories/SiteConfig";
import Intro from "../stories/Sidebar/Intro";
import Sidebar from "@/stories/Sidebar/Sidebar";
import ArticleList from "@/stories/Article/List/ArticleList";
import ArticleItem from "@/stories/Article/List/Item/ArticleItem";
import TopNav from "@/stories/TopNav/TopNav";
import { Layout } from "antd";

const { Header, Sider, Content } = Layout;

export async function getStaticProps(context: any) {
  // const res = await fetch("http://localhost:9396/site-config");
  // const siteConfig = await res.json();

  return {
    props: {
      siteConfig: /*siteConfig &&*/ {
        username: "OnlyWick",
      },
    },
    revalidate: 10,
  };
}

interface HomeProps {
  siteConfig: {
    username: string;
    intro: string[];
    approve: string;
    copyright: string;
  };
}

export default function Home({ siteConfig }: HomeProps) {
  return (
    <>
      <Layout style={{ height: "100%" }}>
        <Sider width={378}>
          <Sidebar></Sidebar>
        </Sider>
        <Layout>
          <Header
            style={{
              height: "auto",
              backgroundColor: "transparent",
              paddingTop: "12px",
              paddingBottom: "12px",
            }}
          >
            <TopNav></TopNav>
          </Header>
          <Content style={{ paddingInline: "50px" }}>
            <ArticleList>
              <ArticleItem></ArticleItem>
              <ArticleItem></ArticleItem>
              <ArticleItem></ArticleItem>
              <ArticleItem></ArticleItem>
            </ArticleList>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
