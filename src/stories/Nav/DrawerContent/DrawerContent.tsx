import styled from "styled-components";

const DrawerContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DrawerContentItem = styled.div``;
const DrawerContentItemName = styled.div`
  font-size: 12px;
`;
const DrawerContentItemMenuList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
const DrawerContentItemMenuItem = styled.li`
  box-sizing: border-box;
  padding: 4px 8px;
  width: calc(50% - var(--wick-medium-margin) * 2);
  margin: var(--wick-medium-margin);
  border-radius: 8px;
  border: 1px solid #e3e8f7;
`;

export default function DrawerContent() {
  return (
    <DrawerContentWrapper>
      <DrawerContentItem>
        <DrawerContentItemName>导航</DrawerContentItemName>
        <DrawerContentItemMenuList>
          <DrawerContentItemMenuItem>主页</DrawerContentItemMenuItem>
          <DrawerContentItemMenuItem>博客</DrawerContentItemMenuItem>
          <DrawerContentItemMenuItem>照片集</DrawerContentItemMenuItem>
          <DrawerContentItemMenuItem>关于</DrawerContentItemMenuItem>
        </DrawerContentItemMenuList>
      </DrawerContentItem>
      <DrawerContentItem>
        <DrawerContentItemName>标签</DrawerContentItemName>
        <DrawerContentItemMenuList>
          <DrawerContentItemMenuItem>主页</DrawerContentItemMenuItem>
          <DrawerContentItemMenuItem>博客</DrawerContentItemMenuItem>
          <DrawerContentItemMenuItem>照片集</DrawerContentItemMenuItem>
          <DrawerContentItemMenuItem>关于</DrawerContentItemMenuItem>
        </DrawerContentItemMenuList>
      </DrawerContentItem>
      <DrawerContentItem>
        <DrawerContentItemName>标签</DrawerContentItemName>
        <DrawerContentItemMenuList>
          <DrawerContentItemMenuItem>主页</DrawerContentItemMenuItem>
          <DrawerContentItemMenuItem>博客</DrawerContentItemMenuItem>
          <DrawerContentItemMenuItem>照片集</DrawerContentItemMenuItem>
          <DrawerContentItemMenuItem>关于</DrawerContentItemMenuItem>
        </DrawerContentItemMenuList>
      </DrawerContentItem>
    </DrawerContentWrapper>
  );
}
