import SiteConfig from "@/stories/SiteConfig";
import Intro from "../stories/Sidebar/Intro";
import Sidebar from "@/stories/Sidebar/Sidebar";
import ArticleList from "@/stories/Article/List/ArticleList";
import ArticleItem from "@/stories/Article/List/Item/ArticleItem";

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
      <Sidebar></Sidebar>
      <ArticleList>
        <ArticleItem></ArticleItem>
        <ArticleItem></ArticleItem>
        <ArticleItem></ArticleItem>
        <ArticleItem></ArticleItem>
      </ArticleList>
    </>
  );
}
