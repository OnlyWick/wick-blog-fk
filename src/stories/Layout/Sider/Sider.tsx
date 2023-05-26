import { ReactNode } from "react";
import styled, { CSSProperties } from "styled-components";

interface SiderWrapperProps {
  width?: string;
}

const SiderWrapper = styled.aside<SiderWrapperProps>`
  flex: 0 0 ${(props) => props.width};
  width: ${(props) => props.width};
  min-width: ${(props) => props.width};
  position: relative;
`;

interface SiderProps {
  children?: ReactNode | ReactNode[];
  style?: CSSProperties;
  width?: string;
}
export default function Sider({ width, children, style }: SiderProps) {
  return (
    <SiderWrapper width={width} style={style}>
      {children}
    </SiderWrapper>
  );
}
