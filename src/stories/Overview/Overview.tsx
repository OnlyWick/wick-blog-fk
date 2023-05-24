import { Badge, Card } from "antd";
import styled from "styled-components";

const MainTagMenuWrapper = styled.div``;
const MainTagMenuHeader = styled.h1`
  margin-bottom: 1.5rem;
`;

const TagListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const TagItem = styled.li`
  margin: 6px 16px;
`;

const BadgeItem = styled.span`
  padding: 4px 22px;
  background-color: #ccc;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  user-select: none;
`;

export default function Overview() {
  return (
    <>
      <MainTagMenuWrapper>
        <Card>
          <MainTagMenuHeader>你正在寻找什么?</MainTagMenuHeader>
          <TagListWrapper>
            <TagItem>
              <Badge title="wtf" size="small" overflowCount={99} count={999}>
                <BadgeItem>前端</BadgeItem>
              </Badge>
            </TagItem>
            <TagItem>
              <Badge size="small" count={5}>
                <BadgeItem>Reac</BadgeItem>
              </Badge>
            </TagItem>
            <TagItem>
              <Badge title="wtf" size="small" overflowCount={99} count={999}>
                <BadgeItem>前端</BadgeItem>
              </Badge>
            </TagItem>
            <TagItem>
              <Badge size="small" count={5}>
                <BadgeItem>React</BadgeItem>
              </Badge>
            </TagItem>
            <TagItem>
              <Badge title="wtf" size="small" overflowCount={99} count={999}>
                <BadgeItem>前端</BadgeItem>
              </Badge>
            </TagItem>
            <TagItem>
              <Badge size="small" count={5}>
                <BadgeItem>Rct</BadgeItem>
              </Badge>
            </TagItem>
          </TagListWrapper>
        </Card>
      </MainTagMenuWrapper>
    </>
  );
}
