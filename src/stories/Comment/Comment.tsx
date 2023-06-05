import styled from "styled-components";
import CommentHeader from "./Header/CommentHeader";
import CommentItem from "./Item/CommentItem";
import { Card } from "antd";
import { useEffect } from "react";
import IComments from "@/interfaces/DTO/IComments";
import IReturnComments from "@/interfaces/DTO/IReturnComments";

const CommentWrapper = styled.div`
  width: 100%;
`;
const CommentListWrapper = styled.div`
  margin-top: 32px;
`;
interface CommentProps {
  commentData?: IReturnComments;
}
export default function Comment({ commentData }: CommentProps) {
  return (
    <CommentWrapper>
      <Card>
        <CommentHeader commentCount={commentData?.count}></CommentHeader>
        <CommentListWrapper>
          {Array.isArray(commentData?.data) &&
            commentData?.data.map((comment) => (
              <CommentItem key={comment.id} comment={comment}></CommentItem>
            ))}
        </CommentListWrapper>
      </Card>
    </CommentWrapper>
  );
}
