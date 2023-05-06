import ArticleViewer from "@/stories/Article/Viewer";
import Comment from "@/stories/Comment/Comment";
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
    <>
      <ArticleViewer
        style={{ marginTop: "64px", marginBottom: "24px" }}
        config={article.data}
      />
      <Comment></Comment>
    </>
  );
}
