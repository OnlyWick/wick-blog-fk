import { Badge, Card } from "@douyinfe/semi-ui";
import styled from "styled-components";

const OverviewWrapper = styled.div`
  & .ant-card {
    background: rgba(255, 255, 255, 0.6);
    margin-bottom: var(--wick-medium-margin);
  }
`;

const MainTagMenuWrapper = styled.div`
  margin-bottom: 8px;
`;
const MainTagMenuHeader = styled.h1`
  margin-bottom: 1.5rem;
`;

const TagListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const TagItem = styled.li`
  margin: 6px 12px;
  border: 1px solid #e3e8f7;
  border-radius: 8px;

  transition: all var(--wick-transition-time) ease-out;

  & .ant-badge {
    color: #363636;
  }

  &:hover {
    background: var(--wick-blue);

    .ant-badge {
      color: var(--wick-white);
    }
  }
`;

const BadgeItem = styled.span`
  display: inline-block;
  height: 100%;
  box-sizing: border-box;
  padding: 6px 22px;
  user-select: none;
  background: var(--heo-card-bg);
  font-size: 14px !important;
  font-weight: bold;
  cursor: pointer;
`;

const ArchiveWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  user-select: none;

  & > li:nth-child(4n) {
    margin-left: 12px;
  }
  & > li:nth-child(4n + 1) {
    margin-right: 12px;
  }

  & > li:not(:nth-child(4n + 1)):not(:nth-child(4n)) {
    margin-left: 12px;
    margin-right: 12px;
  }
`;

const ArchiveItem = styled.li`
  flex: 0 0 calc(25% - 18px);
  box-sizing: border-box;
  margin-top: var(--wick-medium-margin);
  cursor: pointer;

  .ant-card {
    transition: all var(--wick-transition-time) ease-out;
  }

  &:hover {
    .ant-card {
      color: var(--wick-white);
      background-color: var(--wick-green);
    }
  }
`;

const ArchiveItemYear = styled.span`
  opacity: 0.6;
`;
const ArchiveItemArticleCount = styled.span`
  text-align: left;
  font-size: 1.2rem;
  line-height: 1;
  font-weight: bold;
`;

const ArchiveItemArticleCountUnit = styled.span`
  text-align: left;
  font-size: 14px;
  font-weight: bold;
`;

const ColumnWrapper = styled.h2``;

export default function Overview() {
  return (
    <OverviewWrapper>
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
                <BadgeItem>后端</BadgeItem>
              </Badge>
            </TagItem>
            <TagItem>
              <Badge title="wtf" size="small" overflowCount={99} count={999}>
                <BadgeItem>Java</BadgeItem>
              </Badge>
            </TagItem>
            <TagItem>
              <Badge size="small" count={5}>
                <BadgeItem>React</BadgeItem>
              </Badge>
            </TagItem>
            <TagItem>
              <Badge title="wtf" size="small" overflowCount={99} count={999}>
                <BadgeItem>摸鱼喝酒</BadgeItem>
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
      <Card hoverable>
        <ColumnWrapper>专栏直通车</ColumnWrapper>
      </Card>
      <Card hoverable>
        <ColumnWrapper>站点地图</ColumnWrapper>
      </Card>
      <ArchiveWrapper>
        <ArchiveItem>
          <Card
            bodyStyle={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ArchiveItemYear>2023</ArchiveItemYear>
            <ArchiveItemArticleCount>
              999
              <ArchiveItemArticleCountUnit>篇</ArchiveItemArticleCountUnit>
            </ArchiveItemArticleCount>
          </Card>
        </ArchiveItem>
        <ArchiveItem>
          <Card
            bodyStyle={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ArchiveItemYear>2023</ArchiveItemYear>
            <ArchiveItemArticleCount>
              999
              <ArchiveItemArticleCountUnit>篇</ArchiveItemArticleCountUnit>
            </ArchiveItemArticleCount>
          </Card>
        </ArchiveItem>
        <ArchiveItem>
          <Card
            bodyStyle={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ArchiveItemYear>2023</ArchiveItemYear>
            <ArchiveItemArticleCount>
              999
              <ArchiveItemArticleCountUnit>篇</ArchiveItemArticleCountUnit>
            </ArchiveItemArticleCount>
          </Card>
        </ArchiveItem>
        <ArchiveItem>
          <Card
            bodyStyle={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ArchiveItemYear>2023</ArchiveItemYear>
            <ArchiveItemArticleCount>
              999
              <ArchiveItemArticleCountUnit>篇</ArchiveItemArticleCountUnit>
            </ArchiveItemArticleCount>
          </Card>
        </ArchiveItem>
        <ArchiveItem>
          <Card
            bodyStyle={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ArchiveItemYear>2023</ArchiveItemYear>
            <ArchiveItemArticleCount>
              999
              <ArchiveItemArticleCountUnit>篇</ArchiveItemArticleCountUnit>
            </ArchiveItemArticleCount>
          </Card>
        </ArchiveItem>
        <ArchiveItem>
          <Card
            bodyStyle={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ArchiveItemYear>2023</ArchiveItemYear>
            <ArchiveItemArticleCount>
              999
              <ArchiveItemArticleCountUnit>篇</ArchiveItemArticleCountUnit>
            </ArchiveItemArticleCount>
          </Card>
        </ArchiveItem>
        <ArchiveItem>
          <Card
            bodyStyle={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ArchiveItemYear>2023</ArchiveItemYear>
            <ArchiveItemArticleCount>
              999
              <ArchiveItemArticleCountUnit>篇</ArchiveItemArticleCountUnit>
            </ArchiveItemArticleCount>
          </Card>
        </ArchiveItem>
      </ArchiveWrapper>
    </OverviewWrapper>
  );
}
