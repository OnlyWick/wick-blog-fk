import styled from "styled-components";
import CommentHeader from "./Header/CommentHeader";
import CommentItem from "./Item/CommentItem";
import { Card } from "antd";
import { useEffect } from "react";
import IComments from "@/interfaces/IComments";

const CommentWrapper = styled.div`
  width: 100%;
`;
const CommentListWrapper = styled.div`
  margin-top: 32px;
`;
interface CommentProps {
  commentData?: IComments[];
}
export default function Comment({ commentData }: CommentProps) {
  useEffect(() => {
    console.log("给老子变", commentData);
  }, [commentData]);
  return (
    <CommentWrapper>
      <Card>
        <CommentHeader></CommentHeader>
        <CommentListWrapper>
          {Array.isArray(commentData) &&
            commentData.map((comment) => (
              <CommentItem key={comment.id} comment={comment}></CommentItem>
            ))}
        </CommentListWrapper>
      </Card>
    </CommentWrapper>
  );
}
