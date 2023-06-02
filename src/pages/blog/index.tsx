import ArticleFilter from "@/stories/Article/Filter";
import { MenuIcon } from "@/stories/Common/icon";
import Layout from "@/stories/Layout";
import Content from "@/stories/Layout/Content/Content";
import Header from "@/stories/Layout/Header/Header";
import Sider from "@/stories/Layout/Sider/Sider";
import UserWidget from "@/stories/Sidebar/UserWidget";
import SiteConfig from "@/stories/SiteConfig";
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
    <Layout style={{ width: "100%", marginTop: "var(--wick-large-margin)" }}>
      <Sider
        style={{
          marginRight: "var(--wick-large-margin)",
        }}
      >
        <UserWidget
          style={{
            marginBottom: "var(--wick-medium-margin)",
          }}
        ></UserWidget>
        <SiteConfig config={{ approve: "FK", copyright: "ok" }}></SiteConfig>
      </Sider>
      <Layout>
        <Header
          style={{
            height: "auto",
            marginBottom: "var(--wick-medium-margin)",
          }}
        >
          <ArticleFilter />
        </Header>
        <Content>
          {!articles ? (
            <Card loading={true}></Card>
          ) : articles.data.length === 0 ? (
            <Card>
              <Empty description="作者是个废物, 写不出东西? 啊, 作者竟然是我"></Empty>
            </Card>
          ) : (
            <ArticleList articles={articles.data}></ArticleList>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
