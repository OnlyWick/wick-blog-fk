import TopNav from '@/stories/Nav/TopNav/TopNav';
import { Card, Empty, Skeleton } from '@douyinfe/semi-ui'
import dynamic from "next/dynamic";
import useSWR from "swr";
import { Pagination } from '@douyinfe/semi-ui';

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
  } = useSWR("http://localhost:9396/article", fetcher);
  console.log(articles)

  const placeholder = (
    <div className='bg-red-500'>
      <Skeleton.Title style={{ width: 120, marginTop: 10 }} />
      <Skeleton.Title style={{ width: "100%", marginTop: 10 }} />
    </div>
  );

  return (
    <>
      <div className='m-auto max-w-screen-lg'>
        {!articles ? (
          <Card loading={true}></Card>
        ) : articles.data.length === 0 ? (
          <Card>
            <Empty description="作者是个废物, 写不出东西? 啊, 作者竟然是我"></Empty>
          </Card>
        ) : (
          <Skeleton placeholder={placeholder} loading={isLoading}>
            <ArticleList articles={articles.data}></ArticleList>
          </Skeleton>
        )}
      </div>
      <Pagination total={30} style={{ marginBottom: 12 }}></Pagination>
    </>
  );
}
