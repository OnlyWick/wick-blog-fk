import { MenuIcon } from "@/stories/Common/icon";
import { Dropdown, Segmented } from "antd";
import styled from "styled-components";

const ArticleFilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 4px;
`;

const MenuWrapper = styled.div`
  cursor: pointer;
  transition: all 0.5s;
  transform-origin: center;
  display: flex;
  align-items: center;

  &:hover {
    transform: rotate(180deg);
  }
`;

export default function ArticleFilter() {
  return (
    <ArticleFilterWrapper>
      <Segmented
        size="middle"
        style={{
          background: "rgb(208 208 208)",
        }}
        options={[
          "最新",
          "最热",
          {
            label: (
              <div>
                <Dropdown placement="bottom">
                  <span>专栏</span>
                </Dropdown>
              </div>
            ),
            value: "专栏",
          },
        ]}
      ></Segmented>

      <MenuWrapper>
        <MenuIcon></MenuIcon>
      </MenuWrapper>
    </ArticleFilterWrapper>
  );
}
