import { MenuIcon } from "@/stories/Common/icon";
import Overview from "@/stories/Overview";
import { Button, Dropdown, Modal, Segmented } from "antd";
import { useCallback, useState } from "react";
import styled from "styled-components";

const ArticleFilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 4px;
  /* margin-bottom: var(--wick-medium-margin); */
  width: 100%;
`;

const MenuWrapper = styled.div`
  cursor: pointer;
  transition: all 0.5s;
  transform-origin: center;
  display: flex;
  align-items: center;

  @media screen and (max-width: 960px) {
    display: none;
  }

  &:hover {
    transform: rotate(180deg);
  }
`;

export default function ArticleFilter() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ArticleFilterWrapper>
        <Segmented
          size="middle"
          style={{
            background: "rgb(208 208 208)",
          }}
          options={["最新", "最热"]}
        ></Segmented>

        <MenuWrapper>
          <Button onClick={showModal} style={{ padding: 0 }} type="link">
            <MenuIcon></MenuIcon>
          </Button>
        </MenuWrapper>
      </ArticleFilterWrapper>

      <Modal
        style={{
          maxWidth: "1000px",
          minWidth: "500px",
        }}
        bodyStyle={{
          background: "transparent",
          boxShadow: "none",
        }}
        width={"auto"}
        closable={false}
        maskStyle={{
          background: "rgba(255, 255, 255, 0.65)",
          backdropFilter: "saturate(180%) blur(20px)",
        }}
        onCancel={handleCancel}
        open={isModalOpen}
        footer={null}
      >
        <Overview></Overview>
      </Modal>
    </>
  );
}
