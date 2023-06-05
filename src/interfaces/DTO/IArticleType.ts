export default interface ArticleType {
  id: string;
  title: string;
  description: string;
  content: string;
  keywords: string;
  readCount: number;
  popularity: number;
  updatedAt: string;
  // TODO: 提供 tags 类型
  tags: Array<any>;
  voteUpCount: number;
  voteDownCount: number;
}
