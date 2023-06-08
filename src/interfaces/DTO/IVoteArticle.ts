export enum VoteArticleType {
  DOWN,
  UP,
}

export interface IVoteArticleDTO {
  vote_id: string;

  vote_type: VoteArticleType;
}
