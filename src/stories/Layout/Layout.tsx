import styled from "styled-components";
import Sider from "./Sider/Sider";
import { CSSProperties, ReactNode, isValidElement, useState } from "react";

interface LayoutWrapperProps {
  hasSider?: boolean;
}

const LayoutWrapper = styled.section<LayoutWrapperProps>`
  display: flex;
  flex-direction: ${(props) => (props.hasSider ? "row" : "column")};
  ${(props) =>
    props.hasSider
      ? `
  
    & > main {
      width: 0;
    }
  
  `
      : null}
  flex: auto;
  box-sizing: border-box;
  min-height: 0;

  & {
    > section {
      flex-direction: ${(props) => (props.hasSider ? "column" : "row")};
    }
  }
`;

interface LayoutProps {
  children?: ReactNode | ReactNode[];
  style?: CSSProperties;
}

export default function Layout({ children, style }: LayoutProps) {
  //   const [hasSider, setHasSider] = useState<boolean>(false);
  let hasSider = false;
  Array.isArray(children) &&
    children.map((child) => {
      if (isValidElement(child)) {
        if (child.type === Sider) {
          hasSider = true;
        }
      }
    });

  return (
    <LayoutWrapper hasSider={hasSider} style={style}>
      {children}
    </LayoutWrapper>
  );
}
