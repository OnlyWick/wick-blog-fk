import { SmileOutlined } from "@ant-design/icons";
import { Card, Dropdown, MenuProps, Segmented } from "antd";
import styled from "styled-components";

const TopNavWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default function TopNav() {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item (disabled)
        </a>
      ),
      icon: <SmileOutlined />,
      disabled: true,
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: "4",
      danger: true,
      label: "a danger item",
    },
  ];
  return (
    <TopNavWrapper>
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
                <Dropdown
                  placement="bottom"
                  menu={{ items }}
                  trigger={["click"]}
                >
                  <span>专栏</span>
                </Dropdown>
              </div>
            ),
            value: "专栏",
          },
        ]}
      ></Segmented>
    </TopNavWrapper>
  );
}
