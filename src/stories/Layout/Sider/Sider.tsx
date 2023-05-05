import { ReactNode } from "react";
import styled, { CSSProperties } from "styled-components";

const SiderWrapper = styled.aside`
  min-width: 378px;
  flex: 0 0 378px;
  position: relative;
`;

interface SiderProps {
  children?: ReactNode | ReactNode[];
  style?: CSSProperties;
}
export default function Sider({ children, style }: SiderProps) {
  return <SiderWrapper style={style}>{children}</SiderWrapper>;
}
