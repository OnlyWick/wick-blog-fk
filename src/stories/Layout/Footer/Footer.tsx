import { ReactNode } from "react";
import styled, { CSSProperties } from "styled-components";

const FooterWrapper = styled.footer`
  padding: 24px 50px;
`;

interface FooterProps {
  children?: ReactNode | ReactNode[];
  style?: CSSProperties;
}

export default function Footer({ children, style }: FooterProps) {
  return <FooterWrapper style={style}>{children}</FooterWrapper>;
}
