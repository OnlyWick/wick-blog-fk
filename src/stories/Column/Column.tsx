import styled from "styled-components";

const ColumnWrapper = styled.div`
  border: 1px solid red;
`;
const ColumnCover = styled.div`
  background-image: url(Queen.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 300px;
  width: 50%;
`;
export default function Column() {
  return (
    <ColumnWrapper>
      <ColumnCover></ColumnCover>
    </ColumnWrapper>
  );
}
