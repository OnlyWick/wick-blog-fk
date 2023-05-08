import Layout from "@/stories/Layout";
import Header from "@/stories/Layout/Header/Header";
import { SmileOutlined } from "@ant-design/icons";
import { Card, Dropdown, Empty, MenuProps, Segmented } from "antd";
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

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item (disabled)
        </a>
      ),
      icon: <SmileOutlined />,
      disabled: true,
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: "4",
      danger: true,
      label: "a danger item",
    },
  ];

  return (
    <Layout style={{ width: "100%" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Segmented
          size="middle"
          style={{
            background: "rgb(208 208 208)",
          }}
          options={[
            "最新",
            "最热",
            {
              label: (
                <div>
                  <Dropdown
                    placement="bottom"
                    menu={{ items }}
                    trigger={["click"]}
                  >
                    <span>专栏</span>
                  </Dropdown>
                </div>
              ),
              value: "专栏",
            },
          ]}
        ></Segmented>
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
