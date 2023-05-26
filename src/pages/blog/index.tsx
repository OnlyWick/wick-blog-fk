import ArticleFilter from "@/stories/Article/Filter";
import { MenuIcon } from "@/stories/Common/icon";
import Layout from "@/stories/Layout";
import Header from "@/stories/Layout/Header/Header";
import { SmileOutlined } from "@ant-design/icons";
import { Affix, Card, Dropdown, Empty, MenuProps, Segmented } from "antd";
import dynamic from "next/dynamic";
import styled from "styled-components";
import useSWR from "swr";

const ArticleList = dynamic(() => import("@/stories/Article/List/ArticleList"));

const ArticleItem = dynamic(
  () => import("@/stories/Article/List/Item/ArticleItem")
);

const fetcher = (url: any) => fetch(url).then((r) => r.json());

export default function Blog() {
  const {
    data: articles,
    error,
    isLoading,
  } = useSWR("http://192.168.31.86:9396/article", fetcher, {
    // revalidateOnFocus: false,
  });

  return (
    <Layout style={{ width: "100%" }}>
      <Header>
        <ArticleFilter />
      </Header>
      {!articles ? (
        <Card loading={true}></Card>
      ) : articles.data.length === 0 ? (
        <Card>
          <Empty description="作者是个废物, 写不出东西? 啊, 作者竟然是我"></Empty>
        </Card>
      ) : (
        <ArticleList articles={articles.data}></ArticleList>
      )}
    </Layout>
  );
}
