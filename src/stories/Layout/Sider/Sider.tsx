import { ReactNode } from "react";
import styled, { CSSProperties } from "styled-components";

const SiderWrapper = styled.aside`
  height: 100%;
  flex: 0 0 378px;
`;

interface SiderProps {
  children?: ReactNode | ReactNode[];
  style?: CSSProperties;
}
export default function Sider({ children, style }: SiderProps) {
  return <SiderWrapper style={style}>{children}</SiderWrapper>;
}
