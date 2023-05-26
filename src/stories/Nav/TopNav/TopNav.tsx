import { MenuProps, Menu, Drawer, Button } from "antd";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import DrawerContent from "../DrawerContent";

const TopNavWrapper = styled.div`
  transition: all 0.35s;
  display: flex;
  background-color: var(--wick-bg);
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  @media screen and (min-width: 769px) {
    padding: 0 50px;
  }

  @media screen and (max-width: 959px) {
    padding: 0 10px;
  }
`;

const TopNavIcon = styled.div`
  font-size: 16px !important;
  font-weight: bold;
`;

const TopNavControl = styled.div``;

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <TopNavWrapper>
      <TopNavIcon>Wick</TopNavIcon>
      <TopNavControl>
        <svg
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5256"
          width="28"
          height="28"
        >
          <path
            d="M469.333333 768c-166.4 0-298.666667-132.266667-298.666666-298.666667s132.266667-298.666667 298.666666-298.666666 298.666667 132.266667 298.666667 298.666666-132.266667 298.666667-298.666667 298.666667z m0-85.333333c119.466667 0 213.333333-93.866667 213.333334-213.333334s-93.866667-213.333333-213.333334-213.333333-213.333333 93.866667-213.333333 213.333333 93.866667 213.333333 213.333333 213.333334z m251.733334 0l119.466666 119.466666-59.733333 59.733334-119.466667-119.466667 59.733334-59.733333z"
            fill="#444444"
            p-id="5257"
          ></path>
        </svg>
        <Button
          style={{
            padding: 0,
          }}
          type="link"
          onClick={showDrawer}
        >
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3042"
            width="28"
            height="28"
          >
            <path
              d="M170.666667 213.333333h682.666666v85.333334H170.666667V213.333333z m0 512h682.666666v85.333334H170.666667v-85.333334z m0-256h682.666666v85.333334H170.666667v-85.333334z"
              fill="#444444"
              p-id="3043"
            ></path>
          </svg>
        </Button>
      </TopNavControl>
      <Drawer
        open={open}
        placement="right"
        width={300}
        closable={false}
        maskStyle={
          {
            // background: "rgba(255, 255, 255, 0.65)",
            // backdropFilter: "saturate(180%) blur(20px)",
          }
        }
        onClose={onClose}
      >
        <DrawerContent></DrawerContent>
      </Drawer>
    </TopNavWrapper>
  );
}
