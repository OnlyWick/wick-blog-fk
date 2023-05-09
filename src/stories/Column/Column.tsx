import { Card, Divider } from "antd";
import styled from "styled-components";

const ColumnWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  min-height: 220px;
`;
const ColumnCover = styled.div`
  flex: 1;
  background-image: url(Queen.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 4px;
`;

const ColumnRight = styled.div`
  padding: 0 0 0 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ColumnName = styled.h1``;
const ColumnBrief = styled.p`
  flex: 1;
  margin: 8px 0;
`;

const ColumnMeta = styled.div`
  color: #bdbdbd;
  font-size: 14px;
  user-select: none;
`;
const ColumnCreatedAt = styled.span``;
const ColumnPostCounter = styled.span``;

export default function Column() {
  return (
    <Card hoverable>
      <ColumnWrapper>
        <ColumnCover></ColumnCover>
        <ColumnRight>
          <ColumnName>CS APP</ColumnName>
          <ColumnBrief>简单介绍</ColumnBrief>
          <ColumnMeta>
            <ColumnPostCounter>收录文章: 99</ColumnPostCounter>
            <Divider type="vertical" />
            <ColumnCreatedAt>2023年5月3日00:11:30</ColumnCreatedAt>
          </ColumnMeta>
        </ColumnRight>
      </ColumnWrapper>
    </Card>
  );
}
