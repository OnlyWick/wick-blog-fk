export enum VoteType {
  DOWN,
  UP,
}

export enum VoteCategoryType {
  COMMENT = 2929,
  REPLY,
}

export interface IVoteCommentOrReplyDto {
  vote_id: string;

  category: VoteCategoryType;

  vote_type: VoteType;
}
