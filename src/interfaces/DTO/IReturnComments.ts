import IComments from "./Comment/IComments";

export default interface IReturnComments {
  data: IComments[];
  total_count: number;
  comment_count: number;
}
