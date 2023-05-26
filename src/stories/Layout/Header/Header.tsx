import { ReactNode } from "react";
import styled, { CSSProperties } from "styled-components";

const HeaderWrapper = styled.header`
  height: 64px;
  box-sizing: border-box;
  align-items: center;
  display: flex;
`;

interface HeaderProps {
  children?: ReactNode | ReactNode[];
  style?: CSSProperties;
}

export default function Header({ children, style }: HeaderProps) {
  return <HeaderWrapper style={style}>{children}</HeaderWrapper>;
}
