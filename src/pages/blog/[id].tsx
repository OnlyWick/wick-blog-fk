import ArticleAction from "@/stories/Article/Action/ArticleAction";
import ArticleViewer from "@/stories/Article/Viewer";
import Comment from "@/stories/Comment/Comment";
import Layout from "@/stories/Layout";
import Content from "@/stories/Layout/Content/Content";
import Sider from "@/stories/Layout/Sider/Sider";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

type Data = {
  id: string;
};

export const getServerSideProps: GetServerSideProps<{
  article: Data | null;
}> = async (context: GetServerSidePropsContext) => {
  const id = context.params?.id;
  if (id === undefined) {
    return {
      props: {
        article: null,
      },
    };
  }

  const res = await fetch(`http://localhost:9396/article/${id}`);
  const articleData: Data = await res.json();
  console.log(articleData);

  return {
    props: {
      article: articleData,
    },
  };
};

export default function Id({ article }: any) {
  console.log(article);
  return (
    <Layout style={{ marginTop: "24px", width: "100%" }}>
      <Sider width="auto" style={{ marginRight: "24px" }}>
        <ArticleAction></ArticleAction>
      </Sider>
      <Content>
        <ArticleViewer style={{ marginBottom: "24px" }} config={article.data} />
        <Comment></Comment>
      </Content>
    </Layout>
  );
}
