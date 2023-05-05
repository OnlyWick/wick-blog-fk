import Layout from "@/stories/Layout";
import Header from "@/stories/Layout/Header/Header";
import TopNav from "@/stories/TopNav/TopNav";
import { SmileOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Segmented } from "antd";
import dynamic from "next/dynamic";
import useSWR from "swr";

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

const fetcher = (url: any) => fetch(url).then((r) => r.json());

export default function Blog() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:9396/article",
    fetcher
  );
  console.log(data, error, isLoading);
  fetch("").then((res) => {
    console.log;
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
    <>
      <Layout>
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
